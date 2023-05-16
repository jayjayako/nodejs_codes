const stream = require("stream");
const express = require("express");
const multer = require("multer");
const path = require("path");
const { google } = require("googleapis");
const fs = require("fs");

var router = express.Router();

const upload = multer();

const KEYFILEPATH = path.join(__dirname + "/credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

//////////////////////////// upload files /////////////////////////////
const uploadFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google
    .drive({
      version: "v3",
      auth: auth,
    })
    .files.create({
      media: {
        mimeType: fileObject.mimeType,
        body: bufferStream,
      },
      requestBody: {
        name: fileObject.originalname,
        parents: ["10QMv1yDr7fFkf5CosCOdHYs8L78ulI6v"],
      },
      fields: "id,name",
    });
  console.log(`Uploading file ${data.name} ${data.id}`);
};

router.post("/upload", upload.single("file1"), async (req, res) => {
  try {
    // const { body, files } = req;
    // for (let f = 0; f < files.length; f++) {
    //   await uploadFile(files[f]);
    // }
    await uploadFile(req.file);
    // console.log(body);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
  res.json({ data: "success" });
  res.end();
});
//////////////////////////////////////////////////////////////////

////////////////////////// download files /////////////////////////
router.get("/download/:fileId", async (req, res) => {
  const { fileId } = req.params;
  const fileName = "my-downloaded-file.png"; // replace with desired file name
  const filePath = path.join(__dirname, "/tempfiles/" + fileName);

  try {
    await downloadFile(fileId, filePath);
    res.download(filePath, fileName);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error downloading file");
  }
});

const downloadFile = async (fileId, filePath) => {
  const drive = google.drive({
    version: "v3",
    auth: auth,
  });

  const res = await drive.files.get(
    { fileId: fileId, alt: "media" },
    { responseType: "stream" }
  );

  const dest = fs.createWriteStream(filePath);
  res.data.pipe(dest);

  return new Promise((resolve, reject) => {
    dest.on("finish", () => {
      console.log(`Downloaded file ${fileId} to ${filePath}`);
      resolve();
    });

    dest.on("error", (err) => {
      console.error(`Error downloading file ${fileId}: ${err}`);
      reject(err);
    });
  });
};
////////////////////////////////////////////////////////////////

///////////////////////// delete files /////////////////////////
const deleteFile = async (fileId) => {
  const drive = google.drive({
    version: "v3",
    auth: auth,
  });

  try {
    await drive.files.delete({
      fileId: fileId,
    });
    console.log(`File with ID ${fileId} deleted successfully`);
  } catch (err) {
    console.error(`Error deleting file with ID ${fileId}: ${err}`);
  }
};

router.get("/delete/:fileId", async (req, res) => {
  const { fileId } = req.params;
  try {
    await deleteFile(fileId);
    console.log("file successfully deleted");
    res.status(200).send("file successfully deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error downloading file");
  }
});
////////////////////////////////////////////////////////////////

module.exports = router;
