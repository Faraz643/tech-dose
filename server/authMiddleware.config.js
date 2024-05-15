export const authMiddleware = (req, res, next) => {
  if (req.cookies && req.cookies.token) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorised User" });
  }
};
