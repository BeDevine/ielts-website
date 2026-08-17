# IELTS with You

A starter site for one-to-one IELTS teaching: a landing page, a blog/resources
section, and a password-protected dashboard where you write posts. Classes /
booking aren't built yet — this is the foundation to grow from.

## What's here

- **Landing page** (`/`) — intro, teaching approach, latest posts
- **Blog** (`/blog`) — public list of your posts
- **Login** (`/login`) — your teacher sign-in
- **Dashboard** (`/dashboard`) — write, edit, delete posts (login required)

Tech: Next.js (App Router) + Tailwind CSS + Prisma + SQLite. SQLite is a
single file on disk — perfect for now, and a one-line change to Postgres
later if you need multiple editors or a hosted database.

## Run it locally

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
cd ielts-website
npm install
cp .env.example .env
```

Open `.env` and set `SESSION_SECRET` to a long random string. You can
generate one with:

```bash
openssl rand -hex 32
```

Then create the database and your teacher login:

```bash
npm run db:push
npm run db:seed
```

The seed script will ask for your name, email, and a password interactively
— that's what you'll use to log in.

Start the site:

```bash
npm run dev
```

Visit `http://localhost:3000`. Log in at `/login`, and you'll land on
`/dashboard` where you can write your first real post.

## Adding more posts

Just log in and use "New post" on the dashboard. No code changes needed.

## Deploying it for real

The easiest path:

1. Push this folder to a GitHub repo.
2. Create a project on [Vercel](https://vercel.com) and import the repo.
3. Swap SQLite for a hosted Postgres database — [Vercel Postgres](https://vercel.com/storage/postgres)
   or [Supabase](https://supabase.com) both have free tiers. Change one line
   in `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Set `DATABASE_URL` and `SESSION_SECRET` as environment variables in
   Vercel's project settings.
5. Run `npx prisma db push` and `npm run db:seed` once against the live
   database (Vercel's CLI, or a one-off script, both work) to create your
   teacher login on the live site.
6. Buy a domain and point it at the Vercel project — a few clicks in
   Vercel's dashboard.

## What's next (when you're ready)

Natural next additions, in roughly the order they'd matter:

- A "Book a class" / contact form
- Student accounts (the `User.role` field already supports adding a
  `"student"` role)
- Class scheduling and payments (Stripe integrates cleanly with this stack)
- More teachers (the schema already supports multiple `User` rows)

## Project structure

```
src/
  app/
    page.tsx              landing page
    blog/                 public blog
    login/                sign-in
    dashboard/             protected: write/edit posts
    api/                  auth + posts endpoints
  lib/
    db.ts                 Prisma client
    auth.ts               password + session token helpers
    session.ts             read the logged-in user on the server
  middleware.ts            blocks /dashboard for logged-out visitors
prisma/
  schema.prisma            User + Post models
  seed.ts                  interactive script to create your login
```
