const { body } = require("express-validator");
exports.createCategories = () => {
  return [
    body("name")
      .isString()
      .withMessage("Name must be a string")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
  ];
};
