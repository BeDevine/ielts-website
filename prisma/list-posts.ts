import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, title: true, slug: true, category: true, published: true, createdAt: true },
  });

  if (posts.length === 0) {
    console.log("No posts found.");
    return;
  }

  console.log(`\nFound ${posts.length} post(s), oldest first:\n`);
  posts.forEach((p, i) => {
    console.log(`${i + 1}. "${p.title}"`);
    console.log(`   slug: ${p.slug}`);
    console.log(`   category: ${p.category} | published: ${p.published}`);
    console.log(`   created: ${p.createdAt.toISOString()}`);
    console.log("");
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
