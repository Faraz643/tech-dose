import express from "express";
import {
  showAllArticles,
  showSingleArticle,
  addArticle,
  deleteArticle,
  updateArticle,
} from "../controllers/commonLogic.js";
const router = express.Router();

router.get("/", showAllArticles).post("/", addArticle); // show(get) all or add(post) article on admin/blog page
router
  .get("/:id", showSingleArticle) // show single article on blog page
  .put("/:id", updateArticle) // update article via admin page
  .delete("/:id", deleteArticle); //  delete article via admin page

export default router;
