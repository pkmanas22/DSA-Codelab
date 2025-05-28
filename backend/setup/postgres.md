# PostgreSQL Setup using Docker

A complete guide to running PostgreSQL using Docker commands.

---

## 🐳 1. Pull PostgreSQL Image

```bash
sudo docker pull postgres
```

---

## 🛠️ 2. Run PostgreSQL Container

```bash
sudo docker run --name my-postgres -e POSTGRES_USER=manas -e POSTGRES_PASSWORD=manas -p 5432:5432 -d postgres
```

```bash
sudo docker run --name postgres-container \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -d postgres
```

### Explanation:

- `--name` : Name your container
- `-e POSTGRES_USER` : Username
- `-e POSTGRES_PASSWORD` : Password
- `-e POSTGRES_DB` : Database name
- `-p 5432:5432` : Expose PostgreSQL port
- `-d` : Run in detached mode

---

## ✅ 3. Verify Running Containers

```bash
sudo docker ps
```

---

## 🔍 4. Access PostgreSQL CLI

```bash
sudo docker exec -it my-postgres bash
```

```bash
sudo docker exec -it postgres-container psql -U myuser -d mydb
```

---

## 🛑 5. Stop the Container

```bash
sudo docker stop postgres-container
```

---

## 🔁 6. Restart the Container

```bash
sudo docker start postgres-container
```

---

## 🗑️ 7. Remove the Container

```bash
sudo docker rm -f postgres-container
```

---
