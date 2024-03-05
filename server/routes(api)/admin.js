import express from "express";
import {
  adminAddPost,
  adminDeletePost,
  adminUpdatePost,
} from "../controllers/admin.js";
const router = express.Router();

router.post("/add-post", adminAddPost);
router.patch("/update-post", adminUpdatePost);
router.delete("/delete-post", adminDeletePost);

export default router;
