import express from "express";
import {
  adminAddPost,
  adminDeletePost,
  adminUpdatePost,
  authoriseIsAdmin,
} from "../controllers/admin.js";
const router = express.Router();

router.get("/:id", authoriseIsAdmin);
router
  .post("/article", adminAddPost)
  .delete(adminDeletePost)
  .patch(adminUpdatePost);

export default router;
