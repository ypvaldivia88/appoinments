import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("smeagoll", 10);

  const adminUser = await prisma.user.upsert({
    where: { phone: "58658775" },
    update: {},
    create: {
      phone: "58658775",
      password: hashedPassword,
      isAdmin: true,
    },
  });

  console.log({ adminUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
