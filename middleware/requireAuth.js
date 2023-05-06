const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  // res.send(token)

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    // req.user = await User.findOne({ _id }).select("_id");
    req.user = await User.findById(data.id);
    
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = requireAuth;
