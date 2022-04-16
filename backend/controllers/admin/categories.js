const { validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt_decode = require("jwt-decode");
const { formatInTimeZone, zonedTimeToUtc } = require("date-fns-tz");

const storeCategories = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;

    const token = req.headers["token"];

    const decoded_token = jwt_decode(token);

    const user_id = decoded_token.id;

    const date = new Date();
    const date_string = formatInTimeZone(
      date,
      "Europe/Rome",
      "yyyy-MM-dd HH:mm:ss"
    );
    console.log(test_date_utc);
    console.log(date_string); //2022-04-16 11:46:28  (Right time)
    const current_date = new Date(date_string); // 2022-04-16T09:46:28.000Z

    console.log(current_date);

    await prisma.categories.create({
      data: {
        name,
        userId: user_id,
        createdAt: current_date,
        updatedAt: current_date,
      },
    });
    return res
      .status(200)
      .json({ message: "Category created successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
    });
  }
};
const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.categories.findMany({
      include: {
        User: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
const getOneCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "No id provided",
      });
    }

    const category = await prisma.categories.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        category: null,
      });
    }
    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "No id provided",
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const category_check = await prisma.categories.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!category_check) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    const { name } = req.body;

    await prisma.categories.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        updatedAt: new Date(),
      },
    });

    return res
      .status(200)
      .json({ msg: "Category updated successfully", success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "No id provided",
      });
    }

    const category_check = await prisma.categories.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!category_check) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    await prisma.categories.delete({
      where: {
        id: Number(id),
      },
    });

    return res
      .status(200)
      .json({ msg: "Category deleted successfully", success: true });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  storeCategories,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
};
