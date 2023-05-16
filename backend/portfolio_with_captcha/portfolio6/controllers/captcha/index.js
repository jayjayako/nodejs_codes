require("dotenv").config();
const fetch = require("node-fetch");

async function captcha(captchaparam) {
  if (captchaparam) {
    console.log(captchaparam);
    const recaptchaBody = {
      secret: process.env.SECRETKEY,
      response: captchaparam,
    };

    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(Object.entries(recaptchaBody)).toString(),
      }
    );
    const data = await response.json();

    console.log(data.success);
    if (data.success) {
      return "success";
    } else {
      return "invalid";
    }
  } else {
    return "invalid";
  }
}

module.exports = { captcha: captcha };
