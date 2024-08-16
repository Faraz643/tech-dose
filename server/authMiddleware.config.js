import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const authMiddleware = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      const decoded = jwt.verify(token, SECRET_KEY);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      res.status(401).json({ error: err });
    }
  } else {
    res.status(401).json({ error: "Unauthorised User" });
  }
  // console.log(req.headers['authorization'].split(' ')[1])
};
