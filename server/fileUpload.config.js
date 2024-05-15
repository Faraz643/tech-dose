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
