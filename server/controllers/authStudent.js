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
