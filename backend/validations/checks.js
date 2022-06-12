const { body } = require("express-validator");
exports.emailExistCheck = () => {
  return [body("email").isEmail().withMessage("Email is invalid")];
};
