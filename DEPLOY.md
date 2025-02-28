# Deploying Discuss App to Vercel with PostgreSQL

## Prerequisites

Before starting, ensure `npm run build` runs successfully locally and resolves any lingering TypeScript errors.

---

## Migrating from SQLite to PostgreSQL

This project uses SQLite in local development, but Prisma does not support dynamic provider switching, and migrations between providers are incompatible. Thus, we need to migrate to PostgreSQL.

More details: [Prisma Migrate Limitations](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/limitations-and-known-issues).

---

## Migration Steps

### Step 1: Run a Local PostgreSQL Instance

Use Docker to run a PostgreSQL instance. Add this script to `package.json`:

```json
"start:db": "docker run --rm -p 5432:5432 -v postgres-data:/var/lib/postgresql/data -e POSTGRES_HOST_AUTH_METHOD=trust postgres"
```

Start PostgreSQL:

```sh
npm run start:db
```

### Step 2: Remove Existing SQLite Data

Delete `dev.db` and the `migrations` directory.

### Step 3: Update Prisma Schema

Modify `schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Step 4: Install `dotenv-cli`

```sh
npm install dotenv-cli
```

### Step 5: Update `package.json`

Add Prisma commands:

```json
"prisma:migrate:local": "dotenv -e .env.local -- npx prisma migrate dev --schema=prisma/schema.prisma",
"prisma:generate:local": "dotenv -e .env.local -- npx prisma generate --schema=prisma/schema.prisma",
"postinstall": "prisma generate"
```

Update `dev` and `build` scripts:

```json
"dev": "dotenv -e .env.local -- next dev",
"build": "prisma migrate deploy && next build"
```

Full scripts:

```json
"scripts": {
  "dev": "dotenv -e .env.local -- next dev",
  "build": "prisma migrate deploy && next build",
  "start": "next start",
  "lint": "next lint",
  "prisma:migrate:local": "dotenv -e .env.local -- npx prisma migrate dev --schema=prisma/schema.prisma",
  "prisma:generate:local": "dotenv -e .env.local -- npx prisma generate --schema=prisma/schema.prisma",
  "postinstall": "prisma generate",
  "start:db": "docker run --rm -p 5432:5432 -v postgres-data:/var/lib/postgresql/data -e POSTGRES_HOST_AUTH_METHOD=trust postgres"
}
```

### Step 6: Configure Environment Variables

Add this to `.env.local`:

```sh
DATABASE_URL="postgresql://postgres@localhost:5432/postgres?schema=public"
```

### Step 7: Push to GitHub

Commit and push changes to GitHub.

---

## Deploying to Vercel with PostgreSQL

### Step 1: Create a Vercel Project

1. Create a new Vercel project.
2. Link it to GitHub.
3. Expect initial build failures.

### Step 2: Create a Vercel PostgreSQL Instance

1. In the Vercel dashboard, go to **Storage**.
2. Select **Postgres (Neon-powered)** and click **Create**.
3. Name the database (e.g., `discuss`).
4. Click **Connect**.
5. Copy the `DATABASE_URL` from **QuickStart**:
   ```sh
   DATABASE_URL="postgres://user:password@example-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
   ```

### Step 3: Add Environment Variables

Go to **Settings > Environment Variables** in Vercel and add:

- `DATABASE_URL`: (from Step 2)
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `AUTH_SECRET`

#### GitHub OAuth Setup

1. Create a new GitHub OAuth App.
2. Set the Homepage URL to your production Vercel domain.
3. Set the Authorization callback URL:
   ```sh
   https://YOUR-APP-NAME-prod.vercel.app/api/auth/callback/github
   ```

### Step 4: Run Migrations and Deploy

Run Prisma migration locally:

```sh
npm run prisma:migrate:local
```
