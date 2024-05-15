import  jwt  from "jsonwebtoken";
const SECRET_KEY = "538c3d37acf0995cfbd51276c0f1053d";

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
