import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ select: { email: true, name: true } });

  if (users.length === 0) {
    console.log("No users found. Run `npm run db:seed` instead to create one.");
    return;
  }

  console.log("\nExisting login(s):");
  users.forEach((u) => console.log(`  - ${u.email} (${u.name})`));

  const rl = readline.createInterface({ input: stdin, output: stdout });
  const email = (await rl.question("\nWhich email do you want to reset? ")).trim().toLowerCase();
  const password = (await rl.question("New password (min 8 characters): ")).trim();
  rl.close();

  if (password.length < 8) {
    console.error("\nPassword must be at least 8 characters. Run this again.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.update({
    where: { email },
    data: { passwordHash },
  });

  console.log(`\nDone. You can now log in with ${email} and your new password.\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
