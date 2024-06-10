import express from "express";
import {
  adminSignIn,
  adminSignup,
  adminSignOut,
  adminResetPass,
  resetNewPassword,
  verifyToken,
  verifyAccount,
} from "../controllers/auth.js";
const router = express.Router();

router.post("/sign-up", adminSignup); // input regex validation middleware
router.post("/sign-in", adminSignIn); // validation middleware
router.post("/sign-out", adminSignOut); // validation middleware

router.post("/forgot-password", adminResetPass); // validation middleware
router.post("/reset-password/:token", resetNewPassword); // validation middleware
router.get("/verify-token/:token", verifyToken); // validation middleware
router.get("/verify-account/:token", verifyAccount); // validation middleware

export default router;
