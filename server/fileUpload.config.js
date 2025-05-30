import multer from "multer";
import AdmZip from "adm-zip";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const memoryStorage = multer.memoryStorage();

// Upload handlers
export const upload = multer({ storage: memoryStorage });
export const uploadThumbnail = multer({ storage: memoryStorage });
export const handleEventsThumbnail = multer({ storage: memoryStorage });

// File filter for Excel files only
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

// Upload handler for Excel files
export const uploadExcel = multer({
  storage: memoryStorage,
  fileFilter,
});

// Middleware to extract and sort images from ZIP file
export const extractAndSaveImages = (req, res, next) => {
  if (!req.files || !req.files.zipFile || !req.files.excelFile) {
    return res
      .status(400)
      .json({ error: "Both ZIP and Excel files are required" });
  }

  const zipFile = req.files.zipFile[0];
  const zip = new AdmZip(zipFile.buffer);
  const zipEntries = zip.getEntries();

  // Filter and sort image entries
  const imageEntries = zipEntries
    .filter(
      (entry) =>
        !entry.isDirectory &&
        [".jpg", ".jpeg", ".png", ".webp"].includes(path.extname(entry.entryName).toLowerCase())
    )
    .sort((a, b) => {
      const getNumericPrefix = (filename) => parseInt(path.basename(filename).split(".")[0], 10);
      return getNumericPrefix(a.entryName) - getNumericPrefix(b.entryName);
    });

  // Extract image buffers
  req.imageBuffer = imageEntries.map((entry) => entry.getData());
  next();
};
