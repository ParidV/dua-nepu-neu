const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");
const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/auth");

const updateAdminData = async (req, res) => {
  try {
    const token = req.headers["token"];

    const decoded_token = jwt_decode(token);

    const user_id = decoded_token.id;

    const user_check = await prisma.users.findUnique({
      where: {
        id: Number(user_id),
      },
    });

    if (!user_check) {
      return res.status(404).json({
        status: false,
        message: "Unauthorized",
      });
    }

    const { name, surname, email, phone, country, city, address, zip, dob } =
      req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user_updated = await prisma.users.update({
      where: {
        id: user_id,
      },
      data: {
        name,
        surname,
        email,
        phone,
        country,
        city,
        address,
        zip,
        dob: new Date(dob),
      },
    });

    const user = await prisma.users.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        role: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Admin data updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
    });
  }
};

const validateOldTokenAndGeneratingNewToken = async (req, res) => {
  try {
    const token = req.headers["token"];

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token not found",
      });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Access denied",
          success: false,
        });
      }

      const updated_user = await prisma.users.findUnique({
        where: {
          id: user.id,
        },
        select: {
          id: true,
          name: true,
          surname: true,
          email: true,
          role: true,
        },
      });

      const new_token = generateAccessToken(updated_user);

      res.json({
        success: true,
        new_token,
        user: {
          id: updated_user.id,
          name: updated_user.name,
          surname: updated_user.surname,
          email: updated_user.email,
          role: updated_user.role,
        },
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
    });
  }
};

module.exports = {
  updateAdminData,
  validateOldTokenAndGeneratingNewToken,
};
