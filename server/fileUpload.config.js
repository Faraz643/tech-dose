import multer from "multer";
import sanitize from "sanitize-filename";
import AdmZip from "adm-zip";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { getStorage } from "firebase/storage";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

// const thumbnailStorage = multer.diskStorage({
//   destination: "images/article-thumbnail",
//   filename: function (req, file, cb) {
//     let originalFilename = file.originalname;
//     originalFilename = originalFilename.split(" ").join("-");

//     cb(null, Date.now().toString());
//   },
// });

export const uploadThumbnail = multer({ storage: multer.memoryStorage() });
// -------------------------------------------------------------------------------- Excel File images Logic ------------------------------------------------------------------

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only .xlsx files are allowed."), false);
  }
};

export const uploadExcel = multer({
  storage,
  fileFilter,
});

//  ZIP IMAGES SAVE SAVE

// Utility function to save image and get URL
// const saveImage = (buffer, originalName) => {
//   const timestamp = Date.now();
//   const targetPath = path.join(
//     __dirname,
//     "images/article-thumbnail",
//     `${timestamp}`
//   );
//   fs.writeFileSync(targetPath, buffer);
//   return timestamp;
// };

// Middleware to handle ZIP file extraction and image saving
export const extractAndSaveImages = (req, res, next) => {
  if (!req.files || !req.files.zipFile || !req.files.excelFile) {
    return res
      .status(400)
      .json({ error: "Both ZIP and Excel files are required" });
  }

  const zipFile = req.files.zipFile[0];
  const zip = new AdmZip(zipFile.buffer);
  const zipEntries = zip.getEntries();
  let imageUrls = [];
  let imageBuffer = [];
  zipEntries.forEach((entry, index) => {
    if (!entry.isDirectory) {
      // const imageUrl = saveImage(entry.getData(), `${index}`);
      imageUrls.push(imageUrl);
      imageBuffer.push(entry.getData());
    }
  });

  req.imageBuffer = imageBuffer;
  req.imageUrls = imageUrls;
  next();
};
