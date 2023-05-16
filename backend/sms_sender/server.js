require("dotenv").config();

const client = require("twilio")(
  process.env.SMSAPI_TWILLIOSID,
  process.env.SMSAPI_TWILLIOAUTHTOKEN
);

function sendSMS() {
  client.messages
    .create({
      body: "test",
      from: "+15677042759",
      to: "+639922471654",
    })
    .then((message) => console.log(message.sid))
    .catch((error) => {
      // You can implement your fallback code here
      console.log(error);
    });
}

sendSMS();
