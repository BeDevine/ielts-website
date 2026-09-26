import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DAY = 24 * 60 * 60 * 1000;
const DAYS_BETWEEN_POSTS = 3;

const QUEUE: { topic: string; excerpt: string; content: string }[] = [
  {
    topic: "Speaking Part 2",
    excerpt: "How to use your one minute of preparation, and why you should keep talking for the full two minutes.",
    content: [
      "In Part 2 you get one minute to prepare and up to two minutes to speak. Use that minute to jot down 3 or 4 keywords, not full sentences - you won't have time to read sentences back anyway.",
      "Try to keep talking until the examiner stops you. Finishing early usually costs you fluency marks. If you run out of ideas, add a personal example or say why the topic matters to you.",
    ].join("\n\n"),
  },
  {
    topic: "Writing Task 1",
    excerpt: "The one paragraph examiners look for in Task 1 - and the reason so many scores get stuck at 6.",
    content: [
      "The most common reason Task 1 scores get stuck at a 6 is a missing overview. Before you describe any numbers, write two sentences summarising the main trends or the biggest differences.",
      "Examiners look for this specifically. After that, support it with the key figures only. You don't need to mention every number on the chart - choosing the important ones is part of the task.",
    ].join("\n\n"),
  },
  {
    topic: "Reading Timing",
    excerpt: "Three passages, sixty minutes. A simple timing rule so you never run out of time.",
    content: [
      "You have 60 minutes for three passages, so aim for about 20 minutes each - and remember the last passage is usually the hardest.",
      "If one question is taking more than a minute and a half, make your best guess, mark it, and move on. There's no penalty for a wrong answer, so never leave anything blank.",
    ].join("\n\n"),
  },
  {
    topic: "Test Day",
    excerpt: "Small things on the day that make a real difference to your score.",
    content: [
      "Bring the same ID you used when you booked the test, and arrive early so you're not rushing.",
      "In Listening, use the short reading time before each section to underline keywords in the questions. Check your spelling - a correct answer spelled wrongly is marked wrong. And a good night's sleep will do more for you than last-minute cramming.",
    ].join("\n\n"),
  },
  {
    topic: "Writing Task 2",
    excerpt: "Five minutes of planning will save your essay.",
    content: [
      "Spend the first five minutes planning. Decide your position, then write down one main idea for each body paragraph. Candidates who start writing straight away often drift off-topic halfway through.",
      "Make your opinion clear in the introduction and keep it consistent all the way to the conclusion. An essay that changes its mind in the middle loses marks for task response.",
    ].join("\n\n"),
  },
  {
    topic: "Listening Traps",
    excerpt: "Why the first answer you hear is often the wrong one.",
    content: [
      "In Listening, speakers often change their minds: \"Let's meet on Tuesday - actually, no, Thursday is better.\" The first thing you hear is frequently a trap.",
      "Keep listening until the speaker has finished the point before you write your answer, and watch out for words like \"actually\", \"sorry\" and \"in fact\". They usually signal a correction.",
    ].join("\n\n"),
  },
  {
    topic: "Speaking Part 3",
    excerpt: "How to turn short answers into band 7 answers.",
    content: [
      "Part 3 questions are more abstract, and short answers won't show the examiner your range. A simple structure helps: give your answer, explain why, then add an example.",
      "And don't worry about being \"right\". The examiner isn't marking your opinion - it's fine to disagree, or to say it depends, as long as you explain yourself.",
    ].join("\n\n"),
  },
  {
    topic: "Vocabulary Range",
    excerpt: "Why paraphrasing scores better than memorised big words.",
    content: [
      "Examiners reward vocabulary you use accurately, not rare words you've memorised. A simple word used correctly beats an impressive one used wrongly.",
      "A good habit: paraphrase the question. If it asks about \"people who work from home\", talk about \"remote workers\" or \"working remotely\". It shows range without taking risks.",
    ].join("\n\n"),
  },
  {
    topic: "True, False, Not Given",
    excerpt: "The question type that catches out even strong readers.",
    content: [
      "\"Not Given\" means the information simply isn't in the passage - it doesn't mean the statement is wrong. \"False\" means the passage says the opposite.",
      "The golden rule: only use what's written in the text. Don't use your own knowledge, even if you know the statement is true in real life.",
    ].join("\n\n"),
  },
  {
    topic: "Grammar Range",
    excerpt: "Accuracy first, then complexity.",
    content: [
      "Grammar is marked on both range and accuracy. Long, complicated sentences full of mistakes will score lower than clear sentences with a few well-chosen complex structures.",
      "Aim for a mix: mostly accurate, straightforward sentences, with some relative clauses (\"which\", \"who\") and conditionals (\"If I had...\") where they fit naturally.",
    ].join("\n\n"),
  },
];

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Up to +/- 4 hours, so posts don't all land at the same time of day
function jitter() {
  return Math.round((Math.random() - 0.5) * 8 * 60 * 60 * 1000);
}

async function main() {
  const author = await prisma.user.findFirst();
  if (!author) {
    console.error("No teacher account found. Nothing added.");
    process.exit(1);
  }

  const existing = await prisma.post.findMany({
    select: { title: true, slug: true, createdAt: true },
  });

  // Continue numbering from the highest existing "#N"
  let highest = 0;
  for (const p of existing) {
    const m = p.title.match(/#\s*(\d+)/);
    if (m) highest = Math.max(highest, parseInt(m[1], 10));
  }

  // If posts are already scheduled into the future, continue after the last one
  const now = Date.now();
  const latest = existing.reduce((max, p) => Math.max(max, p.createdAt.getTime()), 0);
  let nextTime = latest > now ? latest + DAYS_BETWEEN_POSTS * DAY + jitter() : now;

  let added = 0;
  for (const tip of QUEUE) {
    const alreadyThere = existing.some((p) =>
      p.title.toLowerCase().endsWith(`- ${tip.topic.toLowerCase()}`)
    );
    if (alreadyThere) {
      console.log(`Skipping "${tip.topic}" - already exists.`);
      continue;
    }

    highest += 1;
    const title = `IELTS TIPS #${highest} - ${tip.topic}`;
    let slug = slugify(title);
    if (existing.some((p) => p.slug === slug)) slug = `${slug}-${Date.now().toString(36)}`;

    await prisma.post.create({
      data: {
        title,
        slug,
        excerpt: tip.excerpt,
        content: tip.content,
        category: "TIPS",
        published: true,
        authorId: author.id,
        createdAt: new Date(nextTime),
      },
    });
    console.log(`Scheduled: ${title}  ->  ${new Date(nextTime).toDateString()}`);
    added++;
    nextTime += DAYS_BETWEEN_POSTS * DAY + jitter();
  }

  console.log(`\nDone. ${added} post(s) scheduled.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
