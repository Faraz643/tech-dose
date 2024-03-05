import express from "express";
import { adminSignIn, adminSignup } from "../controllers/auth.js";
const router = express.Router();

router.post("/admin/sign-up", adminSignup);  // USE GET TO SEE log
router.get("/admin/sign-in", adminSignIn);

export default router;
