const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");
const jwt_decode = require("jwt-decode");

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

    await prisma.users.update({
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
        dob,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Admin data updated successfully",
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
};
