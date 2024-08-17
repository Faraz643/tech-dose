import "../envConfig.js";
import { connection } from "../db.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import invalidateToken from "../redisClient.js";
import dotenv from "dotenv";
import { fireBaseAuth } from "../firebase.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import admin from "firebase-admin";
// dotenv.config();
const serviceAccount = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
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
    return res.status(400).json({ message: "No form data received" });
  }

  const { userName, enrollmentId, email, password, year, branch } = req.body;
  const CheckUserInDb = `SELECT * FROM users WHERE enroll_id=? OR email=?`;

  try {
    // Check if the user already exists in the database
    const [userFound] = await connection.query(CheckUserInDb, [
      enrollmentId,
      email,
    ]);
    const userDetails = userFound[0];

    if (userDetails) {
      return res.status(400).json({ message: "User already exists" });
    }
  } catch (error) {
    return res.status(400).json({
      message: "kindly ensure proper values are given in each field",
    });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a verification token
    const userRole = 1;
    const verify_account_token = jwt.sign(
      { userName, enrollmentId, email, hashedPassword, userRole, year, branch },
      SECRET_KEY_VERIFICATION_USE,
      { expiresIn: "30min" }
    );

    // Generate the verification link
    const verifyAccountLink = `${process.env.FRONT_END_ORIGIN}/admin/verify-account/${verify_account_token}`;

    // Send the verification email
    await transporter.sendMail({
      from: "techybadshah@gmail.com",
      to: email,
      subject: `Verify Tech Dose ${userRole} Account`,
      html: `Click on this link to verify your Tech Dose Admin account:\n <a href="${verifyAccountLink}">Verify Account</a>`,
    });

    return res.status(200).json({
      message:
        "Account verification link has been sent to your email and will expire in 30 minutes.",
    });
  } catch (error) {
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
    const year = decoded.year;
    const branch = decoded.branch;
    const addNewUserQuery = `INSERT INTO users (name, enroll_id, password, email, year, user_role,branch) VALUES (?,?,?,?,?,?,?)`;
    // await connection.query(addNewUserQuery, [enroll_id, password, email]);
    // return res.status(200).json({message:});
    connection
      .query(addNewUserQuery, [
        userName,
        enroll_id,
        password,
        email,
        year,
        userRole,
        branch,
      ])
      .then(() => {
        invalidateToken(token);
        res.status(201).json({ message: "New User Added" });
      })
      .catch((err) => {
        res.status(500).json({ message: "Error Adding User" });
      });
  } catch (e) {
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
    const userName = result[0][0].name;
    const userEmail = result[0][0].email;
    const userId = result[0][0].id;
    const isPassMatch = await comparePasswords(password, userPass);
    if (isPassMatch) {
      const token = jwt.sign(
        { enrollmentId, userName, userEmail, userId },
        SECRET_KEY,
        {
          expiresIn: "30m",
        }
      );
      // ---Firebase custom token is disabled for now---
      // const customFireBaseToken = await admin
      //   .auth()
      //   .createCustomToken(enrollmentId);
      // --- ---
      // res.cookie("token", token, {
      //   maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
      //   sameSite: "none",
      //   secure: true,
      // });
      // return res.json({ message: "User Session Created" });
      // console.log(customFireBaseToken);
      return res.json({
        authToken: token,
        // username: userName,
        // useremail: userEmail,
        // fireBaseAuthToken: customFireBaseToken,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Enrollment Id or Password is Incorrect" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// --- signout api is deactivated for now ---

// export const adminSignOut = async (req, res) => {
//   res.clearCookie("token");
//   res.json({ message: "User log out successfully" });
// };

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
      to: result[0][0].email,
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
