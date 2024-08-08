import express from "express";
import {
  showAllArticles,
  showSingleArticle,
  addArticle,
  deleteArticle,
  updateArticle,
  showImage,
  uploadArticleByFile,
} from "../controllers/commonLogic.js";
import {
  uploadThumbnail,
  uploadExcel,
  extractAndSaveImages,
  upload,
} from "../fileUpload.config.js";
import { authMiddleware } from "../authMiddleware.config.js";

const router = express.Router();

const uploadZipAndExcel = upload.fields([
  { name: "zipFile", maxCount: 1 },
  { name: "excelFile", maxCount: 1 },
]);

router
  .get("/", showAllArticles)
  .post("/", uploadThumbnail.single("thumbnail"), addArticle)
  .post(
    "/upload-excel",
    uploadZipAndExcel,
    extractAndSaveImages,
    uploadArticleByFile
  );
router.get("/img/:fileName", showImage);
router
  .get("/:slug", showSingleArticle) // show single article on blog page
  .put(
    "/:slug",
    authMiddleware,
    uploadThumbnail.single("thumbnail"),
    updateArticle
  ) // update article via admin/editor page
  .delete("/:slug", authMiddleware, deleteArticle); //  delete article via admin/editor page

export default router;
