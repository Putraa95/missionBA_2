const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ message: "Token tidak disertakan" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token tidak valid" });
  }
};
