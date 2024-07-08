import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const batTasks = [
  "Check Bat-Signal Bulb",
  "Update Bat-Computer's Antivirus",
  "Refill Batmobile's Anti-Clown Spray",
  "Remind Alfred to Make Bat-Shaped Pancakes",
  "Send Catwoman a Happy Birthday Card",
];

const getRandomBoolean = () => {
  return Math.random() >= 0.5;
};

const prisma = new PrismaClient();

const createBatman = async () => {
  const hashedPassword = await bcrypt.hash("SUPERMAN-SUCKZ", 12);
  const user = await prisma.user.create({
    data: {
      firstName: "Batman",
      lastName: "Wayne",
      email: "batman@wayne.com",
      password: hashedPassword,
    },
  });

  for (let i = 0; i < batTasks.length; i++) {
    await prisma.task.create({
      data: {
        task: batTasks[i],
        completed: getRandomBoolean(),
        authorId: user.id,
      },
    });
  }
};

createBatman()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
