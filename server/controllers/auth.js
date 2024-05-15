import { connection } from "../db.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = "538c3d37acf0995cfbd51276c0f1053d";

export const adminSignup = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "No form data received" });
  }
  const { enrollmentId, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const addNewUserQuery = `INSERT INTO users (enroll_id, password) VALUES (?, ?)`;
  connection
    .query(addNewUserQuery, [enrollmentId, hashedPassword])
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
