import multer from "multer";
import sanitize from "sanitize-filename";

const thumbnailStorage = multer.diskStorage({
  destination: "images/article-thumbnail",
  filename: function (req, file, cb) {
    let originalFilename = file.originalname;
    originalFilename = originalFilename.split(" ").join("-");

    cb(null, Date.now().toString());
  },
});

export const uploadThumbnail = multer({ storage: thumbnailStorage });

const storage = multer.memoryStorage();
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
