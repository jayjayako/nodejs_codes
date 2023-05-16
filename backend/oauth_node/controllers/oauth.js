require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

// Login with Google
router.get("/auth/google", (req, res) => {
  const state = Math.random().toString(36).substring(2);
  const redirectUrl = process.env.REDIRECT_GOOGLEURI; // Replace with your redirect URL
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=code&scope=email&state=${state}`;
  res.json({ authurl: authUrl });
  res.end();
});

router.get("/google", async (req, res) => {
  const { code } = req.query;
  if (code) {
    try {
      const redirectUrl = process.env.REDIRECT_GOOGLEURI; // Replace with your redirect URL
      const tokenUrl = "https://oauth2.googleapis.com/token";
      const { data: tokenData } = await axios.post(tokenUrl, {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUrl,
        grant_type: "authorization_code",
      });
      const { access_token: accessToken } = tokenData;
      const { data: userData } = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      // Use the user data to create or update a user in your database and store their ID in a cookie or session
      res.cookie("sessid", userData, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      });
      res.json({ data: "loggedin" });
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  } else {
    res.json({ data: "invalid" });
    res.end();
  }
});

router.get("/checkuser", (req, res) => {
  if (req.cookies.sessid) {
    res.json({ data: "exist" });
    res.end();
  } else {
    if (req.query.code && req.query.state) {
      res.json({ data: "redirect" });
      res.end();
    } else {
      res.json({ data: "invalid" });
      res.end();
    }
  }
});

router.get("/logout", (req, res) => {
  if (req.cookies.sessid) {
    res.clearCookie("sessid");
    res.json({ data: "logout" });
    res.end();
  } else {
    console.log("Logout already");
  }
});

// Login with Facebook
// router.get("/auth/facebook", (req, res) => {
//   const state = Math.random().toString(36).substring(2);
//   const redirectUrl = "http://your-redirect-url.com/facebook"; // Replace with your redirect URL
//   const authUrl = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${redirectUrl}&scope=email&state=${state}`;
//   res.json({ authurl: authUrl });
//   res.end();
// });

// router.get("/facebook", async (req, res) => {
//   const { code } = req.query;
//   try {
//     const redirectUrl = "http://your-redirect-url.com/facebook"; // Replace with your redirect URL
//     const tokenUrl = "https://graph.facebook.com/v13.0/oauth/access_token";
//     const { data: tokenData } = await axios.get(tokenUrl, {
//       params: {
//         client_id: process.env.FACEBOOK_APP_ID,
//         client_secret: process.env.FACEBOOK_APP_SECRET,
//         redirect_uri: redirectUrl,
//         code,
//       },
//     });
//     const { access_token: accessToken } = tokenData;
//     const { data: userData } = await axios.get(
//       "https://graph.facebook.com/v13.0/me",
//       {
//         params: {
//           fields: "id,email,name,picture",
//           access_token: accessToken,
//         },
//       }
//     );
//     // Use the user data to create or update a user in your database and store their ID in a cookie or session
//     res.redirect("/");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred");
//   }
// });

module.exports = router;
