import express from "express";
import { verifyUserInDb } from "../controllers/authStudent.js";

const router = express.Router();

router.post("/verify-user", verifyUserInDb);

export default router;
