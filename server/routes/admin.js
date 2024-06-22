import express from "express";
import { authoriseIsAdmin } from "../controllers/admin.js";
const router = express.Router();

router.get("/:id", authoriseIsAdmin);

export default router;
