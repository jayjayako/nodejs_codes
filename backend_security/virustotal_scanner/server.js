require("dotenv").config();
const fs = require("fs");
const VirusTotalApi = require("virustotal-api");
const virusTotal = new VirusTotalApi(process.env.VIRUS_TOTAL_API);
//setup_imtc
//ApowerREC
fs.readFile("./uploads/setup_imtc.exe", (err, data) => {
  if (err) {
    console.log(`Cannot read file. ${err}`);
  } else {
    virusTotal
      .fileScan(data, "setup_imtc.exe")
      .then((response) => {
        let resource = response.resource;
        // sometimes later try:
        virusTotal.fileReport(resource).then((result) => {
          console.log(result);
          console.log(result.positives);
        });
      })
      .catch((err) => console.log(`Scan failed. ${err}`));
  }
});
