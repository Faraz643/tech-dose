import "../envConfig.js";
import { connection } from "../db.config.js";

export const verifyUserInDb = async (req, res) => {
  const { firebaseId } = req.body;
  const CheckUserInDbQuery = `SELECT * FROM users WHERE firebase_uid=?`;
  const result = await connection.query(CheckUserInDbQuery, [firebaseId]);

  if (!result[0].length) {
    return res.status(404).json({ userExists: false });
  } else {
    return res.status(200).json({ userExists: true });
  }
  // console.log(result)
};

export const setUpStudentProfile = async (req, res) => {
  const { userName, enrollmentId, email, branch, year, firebaseId } = req.body;
  const addStudentQuery = `INSERT INTO users (name, enroll_id, password, email, year, branch, firebase_uid, user_role) VALUES (?,?,?,?,?,?,?,?)`;
  try {
    const addUser = await connection.query(addStudentQuery, [
      userName,
      enrollmentId,
      "null",
      email,
      year,
      branch,
      firebaseId,
      2,
    ]);
    return res.status(200).json({ message: "Account Created !" });
  } catch (e) {
    return res.status(500).json({ message: "Can not add user at this moment" });
  }
};
