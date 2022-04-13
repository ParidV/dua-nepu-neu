const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { admin_auth } = require("../../../utils/auth");
const jwt_decode = require("jwt-decode");
const { body, validationResult } = require("express-validator");

router.get("/", admin_auth, async (req, res) => {
  try {
    const categories = await prisma.categories.findMany();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});

router.post(
  "/",
  admin_auth,
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  async (req, res) => {
    try {
      const { name } = req.body;

      const token = req.headers["token"];

      const decoded_token = jwt_decode(token);

      const user_id = decoded_token.id;

      await prisma.categories.create({
        data: {
          name,
          userId: user_id,
          createdAt: new Date(),
          updatedAt: new Date(),
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
  }
);
module.exports = router;
