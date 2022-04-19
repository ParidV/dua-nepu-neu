const { validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt_decode = require("jwt-decode");
const { formatInTimeZone } = require("date-fns-tz");

const getCompanyJobs = async (req, res) => {
  try {
    const token = req.headers["token"];
    const decoded_token = jwt_decode(token);
    const user_id = decoded_token.id;

    const jobs = await prisma.jobs.findMany({
      include: {
        User: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
          },
        },
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        userId: user_id,
      },
    });
    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const storeJob = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const token = req.headers["token"];

    const decoded_token = jwt_decode(token);

    const user_id = decoded_token.id;

    await prisma.jobs.create({
      data: {
        title: req.body.title,
        userId: user_id,
        categoryId: Number(req.body.categoryId),
        title: req.body.title,
        start_of_application: req.body.start_of_application,
        end_of_application: req.body.end_of_application,
        country: req.body.country,
        type: req.body.type,
        place_of_work: req.body.place_of_work,
        previous_experience: Number(req.body.previous_experience),
        city: req.body.city,
        salary: Number(req.body.salary),
        description: req.body.description,
        notes: req.body.notes,
        requirements: req.body.requirements,
        coverLetter: req.body.coverLetter,
      },
    });
    return res
      .status(200)
      .json({ message: "Job created successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
    });
  }
};

module.exports = {
  getCompanyJobs,
  storeJob,
};
