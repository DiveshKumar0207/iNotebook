const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({message: "unauthorized"});
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(403).json({message: "Forbidden"});
    }

    req.user = decoded.users;

    next();
  } catch (error) {
    res.status(401).json({message: "unauthorized"});
  }
};

module.exports = verifyUser;
