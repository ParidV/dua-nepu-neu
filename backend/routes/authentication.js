const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  authenticated,
} = require("../utils/auth");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "username and password are required",
      });
    }

    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Password not valid" });
      }
    }

    if (user) {
      //Generate an access token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      await prisma.refreshTokens.create({
        data: {
          token: refreshToken,
        },
      });

      res.json({
        username: user.username,
        isAdmin: user.isAdmin,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(400).json("Username or password incorrect!");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/refresh", async (req, res) => {
  //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  const refresh_token_db = await prisma.refreshTokens.findFirst({
    where: {
      token: refreshToken,
    },
  });

  if (!refresh_token_db)
    return res.status(401).json("You are not authenticated!");
  jwt.verify(refreshToken, "myRefreshSecretKey", async (err, user) => {
    err && console.log(err);
    const refresh_token_id = refresh_token_db.id;
    await prisma.refreshTokens.delete({
      where: {
        id: refresh_token_id,
      },
    });

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await prisma.refreshTokens.create({
      data: {
        token: newRefreshToken,
      },
    });

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});

router.get("/test", authenticated, (req, res) => {
  res.json("Test");
});

module.exports = router;
