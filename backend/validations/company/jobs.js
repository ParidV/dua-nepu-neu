const { body } = require("express-validator");
exports.createJob = () => {
  return [
    body("userId").not().isEmpty().withMessage("User Id is required"),
    body("categoryId").not().isEmpty().withMessage("categoryId Id is required"),
    body("title")
      .isString()
      .withMessage("Title must be a string")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long"),
    body("start_of_application")
      .isDate()
      .withMessage("Start of application must be a date"),
    body("end_of_application")
      .isDate()
      .withMessage("End of application must be a date"),
    body("type").isNumeric().withMessage("Type must be a number"),
    body("country").not().isEmpty().withMessage("Country is required"),
    body("city").not().isEmpty().withMessage("city is required"),
    body("salary").isNumeric().withMessage("Salary must be a number"),
    body("previous_experience")
      .isNumeric()
      .withMessage("Previous experience must be a number"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Description is required")
      .isLength({ min: 3, max: 255 })
      .withMessage(
        "Description must be at least 3 characters long and less than 255 characters long"
      ),
    body("notes")
      .not()
      .isEmpty()
      .withMessage("Shënimet is required")
      .isLength({ min: 3 })
      .withMessage(
        "Description must be at least 3 characters long and less than 255 characters long"
      ),
    body("coverLetter")
      .isNumeric()
      .withMessage("Cover letter must be a number"),
    body("place_of_work")
      .isNumeric()
      .withMessage("Place of work must be a number"),
  ];
};
