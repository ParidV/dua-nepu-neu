const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
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
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Access denied",
        });
      }
      req.user = user;
      console.log(user);
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authenticated,
};
