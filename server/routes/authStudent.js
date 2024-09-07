import express from "express";
import {
  verifyUserInDb,
  setUpStudentProfile,
} from "../controllers/authStudent.js";

const router = express.Router();

router.post("/verify-user", verifyUserInDb);
router.post("/setup-profile", setUpStudentProfile);

export default router;
