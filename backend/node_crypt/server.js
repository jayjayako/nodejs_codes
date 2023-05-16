let crypto;
try {
  crypto = require("crypto");
  console.log("It supports");
} catch (err) {
  console.log("crypto support is disabled!");
}

let lodashNonce = crypto.randomBytes(16).toString("hex");
console.log(lodashNonce);

// this code works
