const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.jobs.findMany({
      include: {
        User: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            phone: true,
            country: true,
            city: true,
            address: true,
            number_of_employers: true,
          },
        },
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
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

module.exports = {
  getAllJobs,
};
