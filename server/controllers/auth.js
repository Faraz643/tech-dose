import { connection } from "../db.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "techybadshah@gmail.com",
    pass: "mibr zubi iifo itzu",
  },
});

const SECRET_KEY = "538c3d37acf0995cfbd51276c0f1053d";
const SECRET_KEY_R = "538c3d37ac3g995@fbd5127#c0f-1053d";

export const adminSignup = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "No form data received" });
  }
  const { enrollmentId, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const addNewUserQuery = `INSERT INTO users (enroll_id,mail, password) VALUES (?, ?,?)`;
  connection
    .query(addNewUserQuery, [enrollmentId, email, hashedPassword])
    .then(() => res.status(201).json({ message: "New User Added" }))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Error Occured" });
    });
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
        sameSite: "lax",
      });
      return res.json({ message: "User Session Created" });
    } else {
      return res
        .status(401)
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
      // send password reset link - LOGIC
      // console.log("no such user found");
      // return "no such user found";
      return res
        .status(400)
        .json({ message: "No user found with this enrollment id" });
    }
    // console.log("result is:", result[0][0].mail);
    const resetToken = jwt.sign({ enrollmentId }, SECRET_KEY_R, {
      expiresIn: "30min",
    });
    const resetLink = `http://localhost:3000/admin/reset-password/${resetToken}`;
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
    console.error(err);
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
    const decoded = jwt.verify(token, SECRET_KEY_R);
    const enrollmentId = decoded.enrollmentId;
    const findUserQuery = `SELECT * FROM users WHERE enroll_id=?`;
    const result = await connection.query(findUserQuery, [enrollmentId]);
    if (!result[0].length) {
      res.status(400).json({ message: "Invalid/Expired Token" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatePassQuery = `UPDATE users SET password=? WHERE enroll_id=?`;
    const updateResult = await connection.query(updatePassQuery, [
      hashedPassword,
      enrollmentId,
    ]);
    return res.send({ message: "Password Updated Successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error In Connection or User Not Found" });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.params;
  try {
    jwt.verify(token, SECRET_KEY_R);
    res.status(200);
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
