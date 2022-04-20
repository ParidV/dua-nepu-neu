const { body } = require("express-validator");
exports.createJob = () => {
  return [
    body("userId")
      .not()
      .isEmpty()
      .withMessage("User Id is required")
      //TODO : check if userId is valid
      .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
          const { userId } = req.body;
          if (userId) {
            resolve(true);
          } else {
            reject(new Error("User Id is required"));
          }
        });
      }),
    body("categoryId").not().isEmpty().withMessage("categoryId Id is required"),
    body("title")
      .isString()
      .withMessage("Title must be a string")
      .isEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long"),
    body("start_of_application")
      .isEmpty()
      .withMessage("Start of application is required")
      .isDate()
      .withMessage("Start of application must be a date"),
    body("end_of_application")
      .isEmail()
      .withMessage("End Of Application is required")
      .isDate()
      .withMessage("End of application must be a date")
      .custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.start_of_application)) {
          throw new Error("End date of lab must be valid and after start date");
        }
        return true;
      }),
    body("type")
      .isNumeric()
      .withMessage("Type must be a number")
      .isEmpty()
      .withMessage("Type is required"),
    body("country")
      .not()
      .isEmpty()
      .withMessage("Country is required")
      .isLength({
        min: 3,
        max: 50,
      })
      .withMessage(
        "Country must be at least 3 characters long, and no more than 50"
      ),
    body("city")
      .not()
      .isEmpty()
      .withMessage("city is required")
      .isLength({
        min: 3,
        max: 50,
      })
      .withMessage(
        "City must be at least 3 characters long, and no more than 50"
      ),
    body("salary").isNumeric().withMessage("Salary must be a number").optional({
      nullable: true,
    }),
    body("previous_experience")
      .isNumeric()
      .withMessage("Previous experience must be a number")
      .optional({
        nullable: true,
      }),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Description is required")
      .isLength({ min: 10, max: 1500 })
      .withMessage(
        "Description must be at least 10 characters long and less than 1500 characters long"
      ),
    body("notes")
      .not()
      .isEmpty()
      .withMessage("Shënimet is required")
      .isLength({ max: 1500 })
      .withMessage("Notes must be at less than 255 characters long")
      .optional({
        nullable: true,
      }),
    body("coverLetter")
      .isNumeric()
      .withMessage("Cover letter must be a number")
      .isEmpty()
      .withMessage("Cover letter is required"),
    body("place_of_work")
      .isNumeric()
      .withMessage("Place of work must be a number")
      .isEmpty()
      .withMessage("Place of work is required"),
  ];
};
