const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function main() {
  password = await bcrypt.hash("1", 10);

  const datetime = new Date("2020-01-01");

  const admin = await prisma.users.upsert({
    where: { email: "admin@email.com" },
    update: {},
    create: {
      email: "admin@email.com",
      name: "Admin",
      surname: "Admin",
      password: password,
      phone: "123456789",
      country: "Poland",
      
      city: "Warsaw",
      address: "Skenderbeu",
      dob: datetime,
      role: 3,
    },
  });

  const company = await prisma.users.upsert({
    where: { email: "company@email.com" },
    update: {},
    create: {
      email: "company@email.com",
      name: "Company",
      surname: "Surname",
      password: password,
      phone: "123456789",
      country: "Poland",
      city: "Warsaw",
      address: "Skenderbeu",
      dob: datetime,
      role: 2,
    },
  });

  const user = await prisma.users.upsert({
    where: { email: "user@email.com" },
    update: {},
    create: {
      email: "user@email.com",
      name: "User",
      surname: "Surname",
      password: password,
      phone: "123456789",
      country: "Poland",
      city: "Warsaw",
      address: "Skenderbeu",
      dob: datetime,
      role: 1,
    },
  });

  console.log({ user, admin, company });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
