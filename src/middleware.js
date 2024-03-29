import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) return res.status(403);
      next();
    });
  } else {
    res.status(401);
  }
};
