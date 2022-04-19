const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
    },
    "mySecretKey",
    {
      expiresIn: "10d",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      avatar: user.avatar,
      phone: user.phone,
      country: user.country,
      city: user.city,
      address: user.address,
      zip: user.zip,
      role: user.role,
      dob: user.dob,
      cv: user.cv,
    },
    "myRefreshSecretKey"
  );
};

const authenticated = (req, res, next) => {
  const token = req.headers["token"];
  if (token) {
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Access denied",
          success: false,
        });
      }

      req.user = user;
      console.log(user);
      next();
    });
  } else {
    res.status(401).json({
      message: "You are not authenticated!",
      success: false,
    });
  }
};

const user_auth = (req, res, next) => {
  const token = req.headers["token"];
  if (token) {
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Access denied",
          success: false,
        });
      }
      if (user.role !== 1) {
        return res.status(403).json({
          message: "Access denied",
          success: false,
        });
      }
      req.user = user;
      console.log(user);
      next();
    });
  } else {
    res.status(401).json({
      message: "You are not authenticated!",
      success: false,
    });
  }
};
const company_auth = (req, res, next) => {
  const token = req.headers["token"];
  if (token) {
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Access denied",
          success: false,
        });
      }
      if (user.role !== 2) {
        return res.status(403).json({
          message: "Access denied",
          success: false,
        });
      }
      req.user = user;
      console.log(user);
      next();
    });
  } else {
    res.status(401).json({
      message: "You are not authenticated!",
      success: false,
    });
  }
};
const admin_auth = (req, res, next) => {
  const token = req.headers["token"];
  if (token) {
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Access denied",
          success: false,
        });
      }
      if (user.role !== 3) {
        return res.status(403).json({
          message: "Access denied",
          success: false,
        });
      }
      req.user = user;
      console.log(user);
      next();
    });
  } else {
    res.status(401).json({
      message: "You are not authenticated!",
      success: false,
    });
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authenticated,
  user_auth,
  company_auth,
  admin_auth,
};
