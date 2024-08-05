import express from "express";
import {
  adminSignIn,
  adminSignup,
  adminSignOut,
  adminResetPass,
  resetNewPassword,
  verifyAccount,
} from "../controllers/auth.js";
import { verifyUsedToken } from "../redisClient.js";

const router = express.Router();

router.post("/sign-up", adminSignup); // input regex validation middleware
router.post("/sign-in", adminSignIn); // validation middleware
// router.post("/sign-out", adminSignOut); // Deactiavted for now

router.post("/forgot-password", adminResetPass); // validation middleware
router.post("/reset-password/:token", verifyUsedToken, resetNewPassword); // validation middleware
router.get("/reset-password/:token", verifyUsedToken, resetNewPassword); // validation middleware
router.get("/verify-account/:token", verifyUsedToken, verifyAccount); // validation middleware

export default router;
