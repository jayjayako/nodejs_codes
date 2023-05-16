require("dotenv").config();
const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const fsx = require("fs-extra");

router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp",
  })
);

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

// const KEYFILEPATH = path.join(__dirname + "/credentials.json");
// const SCOPES = ["https://www.googleapis.com/auth/drive"];

// const auth = new google.auth.GoogleAuth({
//   keyFile: KEYFILEPATH,
//   scopes: SCOPES,
// });

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
  scopes: SCOPES,
});

const drive = google.drive({
  version: "v3",
  auth: auth,
});

////////////////////////// upload files /////////////////////////
const uploadFile = async (fileObject) => {
  const bufferStream = fs.createReadStream(fileObject.tempFilePath);

  const { data } = await drive.files.create({
    resource: {
      name: fileObject.name,
      parents: ["10QMv1yDr7fFkf5CosCOdHYs8L78ulI6v"],
    },
    media: {
      mimeType: fileObject.mimetype,
      body: bufferStream,
    },
    fields: "id,name",
  });
  console.log(`Uploading file ${data.name} ${data.id}`);
  return data;
};

router.post("/upload", async (req, res) => {
  try {
    const fileObject = req.files.file1;
    await uploadFile(fileObject);
    fsx
      .emptyDir("./tmp")
      .then(() => {
        console.log("tmp deleted");
      })
      .catch((err) => {
        console.error(err);
      });
    console.log("success");
    res.json({ data: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//////////////////////////////////////////////////////////////////

////////////////////////// download files /////////////////////////
router.get("/download/:fileId", async (req, res) => {
  const { fileId } = req.params;
  const fileName = "my-downloaded-file.png"; // replace with desired file name
  const filePath = path.join(res.locals.rootdir, "/downloads/" + fileName);

  try {
    await downloadFile(fileId, filePath);

    const downloadtoclient = (filePathparam, fileNameparam, callback) => {
      res.download(filePathparam, fileNameparam, callback);
    };

    // Example usage
    downloadtoclient(filePath, fileName, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        return;
      }
      console.log("File downloaded successfully");
      fsx
        .emptyDir("./downloads")
        .then(() => {
          console.log("downloads deleted");
        })
        .catch((err) => {
          console.error(err);
        });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error downloading file");
  }
});

const downloadFile = async (fileId, filePath) => {
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

///////////////////////// display files ////////////////////////
const getFileMetadata = async (fileId) => {
  try {
    const response = await drive.files.get({
      fileId: fileId,
      fields: "name,webViewLink",
    });

    return response.data;
  } catch (error) {
    console.error(`Error retrieving file metadata: ${error}`);
    throw error;
  }
};

const authfirst = async (req, res, next) => {
  const { authname } = req.params;
  if (authname == "arturo") {
    next();
  } else {
    res.send("Invalid User");
  }
};

router.get("/display/:fileId/:authname", authfirst, async (req, res) => {
  const { fileId } = req.params;
  try {
    const file = await getFileMetadata(fileId);
    const fileName = file.name;

    const response = await drive.files.get(
      { fileId: fileId, alt: "media" },
      { responseType: "stream" }
    );

    res.set({
      "Content-Disposition": `inline; filename="${fileName}"`,
      "Content-Type": file.mimeType,
    });
    response.data.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error displaying image");
  }
});
// http://localhost:3000/api/fileupload/display/1OrCOVtHBz1QrdV4PLshk8XMIMtTSX4Ru/arturo
////////////////////////////////////////////////////////////////
module.exports = router;
