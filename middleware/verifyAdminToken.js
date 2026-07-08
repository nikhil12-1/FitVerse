const jwt = require("jsonwebtoken");

const verifyAdminToken = (req, res, next) => {

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin role required." });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyAdminToken;
