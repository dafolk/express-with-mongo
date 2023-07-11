const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const excludedPath = ["/api/users/login", "/api/users/register"];

  if (!excludedPath.includes(req.path)) {
    next();
  } else {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (token == null) {
      res.send({
        error: true,
        message: "auth token required",
      });
      return;
    }

    var decoded = jwt.verify(token, "secretKey");
    req.user = decoded;

    next();
  }
};

const isTokenExpired = (token) => {
  let bool = false;
  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
      if (err.name == "TokenExpiredError") {
        bool = true;
      }
    }
  });
  return bool;
};

const generateToken = (payload) => {
  return jwt.sign(
    {
      email: payload,
    },
    "secretKey",
    {
      expiresIn: "120000ms",
    }
  );
};

module.exports = { authorization, generateToken, isTokenExpired };
