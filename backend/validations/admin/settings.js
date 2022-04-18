const { body } = require("express-validator");
exports.updateAdminDataValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Name must be a string")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("surname")
      .isString()
      .withMessage("Surname must be a string")
      .isLength({ min: 3 })
      .withMessage("Surname must be at least 3 characters long"),
    body("email")
      .isString()
      .withMessage("Email must be a string")
      .isEmail()
      .withMessage("Email must be a valid email address"),
    body("phone")
      .isString()
      .withMessage("Phone must be a string")
      .isLength({ min: 6, max: 13 })
      .withMessage("Phone must min 6 and max 13 characters long"),
    body("country")
      .isString()
      .withMessage("Country must be a string")
      .isLength({ min: 2 })
      .withMessage("Country must be at least 2 characters long"),
    body("city")
      .isString()
      .withMessage("City must be a string")
      .isLength({ min: 3 })
      .withMessage("City must be at least 3 characters long"),
    body("address")
      .isString()
      .withMessage("Address must be a string")
      .isLength({ min: 3 })
      .withMessage("Address must be at least 3 characters long"),
    body("zip")
      .optional()
      .if((value) => value !== null)
      .isNumeric()
      .withMessage("Please enter a valid number!"),
    body("dob").isDate().withMessage("Please enter a valid date!"),
  ];
};
