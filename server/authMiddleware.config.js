import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY;

export const authMiddleware = (req, res, next) => {
  if (req.cookies && req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, SECRET_KEY);
      next();
    } catch (err) {
      res.status(401).json({ error: "Unauthorised User" });
    }
  } else {
    res.status(401).json({ error: "Unauthorised User" });
  }
};
