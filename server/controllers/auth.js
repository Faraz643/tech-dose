import '../envConfig.js'
import { connection } from "../db.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import invalidateToken from "../redisClient.js";
import dotenv from "dotenv";
// dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_KEY_VERIFICATION_USE = process.env.VERIFICATION_SECRET_KEY;

export const adminSignup = async (req, res) => {
  if (!req.body) {
    console.log("request body:", req.body);
    return res
      .status(404)
      .json({ message: "No form data received", body: req.body });
  }
  const { userName, enrollmentId, email, password, userRole } = req.body;
  console.log("username is:", req.body);
  const hashedPassword = await bcrypt.hash(password, 10);
  const verify_account_token = jwt.sign(
    { userName, enrollmentId, email, hashedPassword, userRole },
    SECRET_KEY_VERIFICATION_USE,
    {
      expiresIn: "30min",
    }
  );
  try {
    const verifyAccountLink = `${process.env.FRONT_END_ORIGIN}/admin/verify-account/${verify_account_token}`;
    await transporter.sendMail({
      from: "techybadshah@gmail.com",
      to: email,
      subject: `Verify Tech Dose ${userRole} Account`,
      html: `Click on this link to verify your ${userRole} account:\n <a href="${verifyAccountLink}">Verify Account</a> `,
    });
    return res.send({
      message:
        "Account verification link has been sent to your email and will expire in 30mins",
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyAccount = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, SECRET_KEY_VERIFICATION_USE);
    const userName = decoded.userName;
    const userRole = decoded.userRole;
    const enroll_id = decoded.enrollmentId;
    const password = decoded.hashedPassword;
    const email = decoded.email;
    console.log("password is:", password);
    const addNewUserQuery = `INSERT INTO users (name, enroll_id, password, email, year, user_role) VALUES (?,?,?,?,?,?)`;
    // await connection.query(addNewUserQuery, [enroll_id, password, email]);
    // return res.status(200).json({message:});
    connection
      .query(addNewUserQuery, [
        userName,
        enroll_id,
        password,
        email,
        2024,
        userRole,
      ])
      .then(() => {
        invalidateToken(token);
        res.status(201).json({ message: "New User Added" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error Adding User" });
      });
  } catch (e) {
    console.log("dont know what is the error");
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// compare password logic

async function comparePasswords(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Error comparing passwords: " + error.message);
  }
}

// @middleware -> validate user data and user role, access token
export const adminSignIn = async (req, res) => {
  const { enrollmentId, password } = req.body;
  if (!enrollmentId || !password) {
    return res
      .status(400)
      .json({ message: "Missing Enrollment ID or Password" });
  }
  try {
    const getUserQuery = `SELECT * FROM users WHERE enroll_id=?`;
    const result = await connection.query(getUserQuery, [enrollmentId]);
    if (!result[0].length) {
      return res.status(401).json({ message: "User Not Found" });
    }
    const userPass = result[0][0].password;
    const isPassMatch = await comparePasswords(password, userPass);
    if (isPassMatch) {
      const token = jwt.sign({ enrollmentId }, SECRET_KEY, {
        expiresIn: "30m",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        domain:'tech-dose-view.onrender.com',
        path:'/',
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
      });
      return res.json({ message: "User Session Created" });
    } else {
      return res
        .status(400)
        .json({ message: "Enrollment Id or Password is Incorrect" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const adminSignOut = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User log out successfully" });
};

export const adminResetPass = async (req, res) => {
  const { enrollmentId } = req.body;
  try {
    const findUserQuery = `SELECT * FROM users WHERE enroll_id=?`;
    const result = await connection.query(findUserQuery, [enrollmentId]);
    if (!result[0].length) {
      return res
        .status(404)
        .json({ message: "No user found with this enrollment id" });
    }
    const resetToken = jwt.sign({ enrollmentId }, SECRET_KEY_VERIFICATION_USE, {
      expiresIn: "30min",
    });
    const resetLink = `${process.env.FRONT_END_ORIGIN}/admin/reset-password/${resetToken}`;
    await transporter.sendMail({
      from: "techybadshah@gmail.com",
      to: result[0][0].mail,
      subject: "Tech Dose Password Reset",
      html: `Click on this link to reset your password:\n <a href="${resetLink}">Reset Password Link</a> `,
    });
    return res.send({
      message: "Password reset link has been sent to your email",
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetNewPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  if (!newPassword || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "Enter Password in both the fields" });
  } else if (newPassword != confirmPassword) {
    return res
      .status(400)
      .json({ message: "New Password and Confirm Password must be same" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY_VERIFICATION_USE);
    const enrollmentId = decoded.enrollmentId;
    const findUserQuery = `SELECT * FROM users WHERE enroll_id=?`;
    const result = await connection.query(findUserQuery, [enrollmentId]);
    if (!result[0].length) {
      res.status(401).json({ message: "Invalid/Expired Token" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatePassQuery = `UPDATE users SET password=? WHERE enroll_id=?`;
    await connection.query(updatePassQuery, [hashedPassword, enrollmentId]);
    invalidateToken(token);
    return res.send({ message: "Password Updated Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
