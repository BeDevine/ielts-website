import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findFirst();
  if (existing) {
    console.log(`A teacher account already exists (${existing.email}). Skipping seed.`);
    return;
  }

  const rl = readline.createInterface({ input: stdin, output: stdout });

  console.log("\nLet's set up your teacher login.\n");
  const name = (await rl.question("Your name: ")).trim() || "Teacher";
  const email = (await rl.question("Login email: ")).trim().toLowerCase();
  const password = (await rl.question("Password (min 8 characters): ")).trim();
  rl.close();

  if (!email || password.length < 8) {
    console.error("\nEmail is required and password must be at least 8 characters. Run `npm run db:seed` again.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { name, email, passwordHash, role: "teacher" },
  });

  // A first sample post so the blog isn't empty on first run.
  await prisma.post.create({
    data: {
      title: "Welcome to the blog",
      slug: "welcome-to-the-blog",
      excerpt: "This is your first post. Edit or delete it from the dashboard any time.",
      content:
        "This is a sample post created automatically when you set up your site.\n\nHead to /dashboard to write your first real IELTS tip, sign in with the login you just created, and replace this post with something useful for your students.",
      category: "Announcements",
      authorId: user.id,
    },
  });

  console.log(`\nDone. Log in at /login with ${email}\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
