import express from "express";
import {
  showAllArticles,
  showSingleArticle,
  addArticle,
  deleteArticle,
  updateArticle,
  showImage,
} from "../controllers/commonLogic.js";
import { uploadThumbnail } from "../fileUpload.config.js";
import { authMiddleware } from "../authMiddleware.config.js";

const router = express.Router();

router
  .get("/", showAllArticles)
  .post("/", authMiddleware, uploadThumbnail.single("thumbnail"), addArticle);
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
