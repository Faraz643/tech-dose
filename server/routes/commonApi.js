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
const router = express.Router();

router
  .get("/", showAllArticles)
  .post("/", uploadThumbnail.single("thumbnail"), addArticle); // show(get) all or add(post) article on admin/blog page
// router.get("/image/:filePath", showImage);
router.get("/img/:fileName", showImage);
router
  .get("/:slug", showSingleArticle) // show single article on blog page
  .put("/:id", updateArticle) // update article via admin/editor page
  .delete("/:slug", deleteArticle); //  delete article via admin/editor page

export default router;
