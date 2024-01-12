const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const adminRequireAuth = async (req, res, next) => {
  // verify  authentication
  const { authorization, role } = req.headers;
  console.log(role);

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // checking user role
  console.log(role);

  // checking user token
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    if (role === "admin" || role === "super") {
      next();
    } else {
      res.status(401).json({
        error:
          "Access Denied: The Admin page is restricted to authorized administrators only. Please contact the system administrator for assistance.",
      });
    }
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

const requireAuth = async (req, res, next) => {
  // verify  authentication
  const { authorization, role } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = { requireAuth, adminRequireAuth };
