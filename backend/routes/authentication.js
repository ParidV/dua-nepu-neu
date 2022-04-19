const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { generateAccessToken, generateRefreshToken } = require("../utils/auth");

const { emailExistCheck } = require("../validations/checks");

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
        return res.status(400).json({ error: "Password not valid" });
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
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(400).json({
        error: "Invalid username or password",
      });
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

router.get("/user/current", (req, res) => {
  // get token and send user info
  const token = req.headers["token"];
  console.log(token);
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });

  jwt.verify(token, "mySecretKey", (err, user) => {
    if (err) return res.status(500).json("Invalid token.", err);
    res.status(200).json(user);
  });
});
router.get("/user/current_user_data", (req, res) => {
  // get token and send user info
  const token = req.headers["token"];
  console.log(token);
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });

  jwt.verify(token, "mySecretKey", async (err, user_data) => {
    if (err)
      return res.status(500).json(
        {
          success: false,
          message: "Invalid token.",
        },
        err
      );
    const user = await prisma.users.findUnique({
      where: {
        id: Number(user_data.id),
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        role: true,
        avatar: true,
        phone: true,
        address: true,
        country: true,
        city: true,
        zip: true,
        number_of_employers: true,
        dob: true,
        description: true,
        cv: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json({ success: true, user });
  });
});

router.get("/user/email_check/:email", async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "No id provided",
    });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const token = req.headers["token"];
  console.log(token);
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });

  jwt.verify(token, "mySecretKey", async (err, user_data) => {
    user_id = user_data.id;
    if (err) return res.status(500).json("Invalid token.", err);
    try {
      const user = await prisma.users.findMany({
        where: {
          id: {
            not: user_id,
          },
          email,
        },
      });
      if (user.length > 0) {
        return res.status(200).json({
          success: false,
          message: "Email already exists",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Email is available",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
});

module.exports = router;
