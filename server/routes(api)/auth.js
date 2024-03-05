import express from "express";
import { adminSignIn, adminSignup } from "../controllers/auth.js";
const router = express.Router();

router.post("/sign-up", adminSignup);
router.get("/sign-in", adminSignIn);

export default router;
