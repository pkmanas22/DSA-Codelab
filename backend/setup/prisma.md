# Prisma CLI Commands Guide

---

## 📁 1. Initialize Prisma

Creates the `prisma/schema.prisma` file and `.env`.

```bash
npx prisma init
```

---

## 🔄 2. Migrate the Database

### a. Create a New Migration (can skip --name)

```bash
npx prisma migrate dev --name init
```

### b. Deploy Migrations to Production

```bash
npx prisma migrate deploy
```

### c. Reset DB & Reapply Migrations

```bash
npx prisma migrate reset
```

---

## 🧠 3. Generate Prisma Client

Generates the client based on your schema.

- This is also auto-run when you use migrate dev.

```bash
npx prisma generate
```

---

## 🔍 4. Introspect Existing Database

Pull an existing database schema into your Prisma schema:

```bash
npx prisma db pull
```

---

## 🧹 5. Push Schema (No Migration)

Push the schema to the database without creating SQL migrations:

```bash
npx prisma db push
```

---

## 🖥️ 6. Open Prisma Studio

GUI to browse and edit your database:

```bash
npx prisma studio
```

---

## 🛠️ 7. Format Prisma Schema

Automatically format your `schema.prisma` file:

```bash
npx prisma format
```

---

## 🧪 8. Validate Prisma Schema

Ensure your schema has no errors:

```bash
npx prisma validate
```

---

## 📦 9. Install Prisma Client

```bash
npm install @prisma/client
```
