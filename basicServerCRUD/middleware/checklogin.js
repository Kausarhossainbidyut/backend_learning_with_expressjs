const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(401).json({
        error: "Authorization header missing",
      });
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { username, userId } = decoded;
    req.username = username;
    req.userId = userId;
    next();
  } catch {
    next("Authentication failure can't login!");
  }
};

module.exports = checkLogin;
