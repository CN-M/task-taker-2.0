"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
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
const prisma = new client_1.PrismaClient();
const createBatman = async () => {
    const hashedPassword = await bcryptjs_1.default.hash("SUPERMAN-SUCKZ", 12);
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
