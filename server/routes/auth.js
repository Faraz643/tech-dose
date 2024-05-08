import express from "express";
import { adminSignIn, adminSignup } from "../controllers/auth.js";
const router = express.Router();

router.post("/sign-up", adminSignup); // input regex validation middleware
router.post("/sign-in", adminSignIn); // validation middleware

export default router;
