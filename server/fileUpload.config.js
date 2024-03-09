import multer from "multer";
import sanitize from "sanitize-filename";

const thumbnailStorage = multer.diskStorage({
  destination: "images/article-thumbnail",
  filename: function (req, file, cb) {
    const originalFilename = file.originalname;
    const sanitizedFileName = sanitize(originalFilename);
    cb(null, Date.now() + "-"+ originalFilename);
  },
});

export const uploadThumbnail = multer({ storage: thumbnailStorage });
