const NodeClam = require("clamscan");
options = {
  clamdscan: {
    socket: null, // This is pretty typical
    host: "clamav", // If you want to connect locally but not through socket
    port: 3310,
  },
};
const ClamScan = new NodeClam().init(options);

ClamScan.then(async (clamscan) => {
  try {
    // You can re-use the `clamscan` object as many times as you want
    const version = await clamscan.getVersion();
    console.log(`ClamAV Version: ${version}`);

    const { isInfected, file, viruses } = await clamscan.isInfected(
      "/uploads/setup_imtc.exe"
    );
    if (isInfected) console.log(`${file} is infected with ${viruses}!`);
  } catch (err) {
    // Handle any errors raised by the code in the try block
  }
}).catch((err) => {
  // Handle errors that may have occurred during initialization
});
