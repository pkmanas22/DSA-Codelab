# ⚖️ Judge0 Installation (Ubuntu)

---

## 🛠️ Step-by-Step Judge0 Installation

This guide walks you through installing and running Judge0 v1.13.1 on Ubuntu using Docker.

---

## 📥 1. Download Judge0

```bash
mkdir -p ~/judge0
cd ~/judge0
wget https://github.com/judge0/judge0/releases/download/v1.13.1/judge0-v1.13.1.zip
unzip judge0-v1.13.1.zip
cd judge0-v1.13.1
```

---

## ⚙️ 2. Configure Environment

Edit the `.env` or `judge0.conf` file to set passwords and other variables:

```bash
vi judge0.conf
# OR
nano .env
```

Update variables like:

- `POSTGRES_PASSWORD`
- `REDIS_PASSWORD`

You can generate secure passwords using a tool like [Random Password Generator](https://www.random.org/passwords/?num=1&len=32&format=plain&rnd=new).

- Update the `REDIS_PASSWORD` with the generated password.
- Repeat the process for `POSTGRES_PASSWORD` using a new random password.

---

## 🐳 3. Start Judge0 Using Docker Compose

- Start the database and Redis services:
  ```bash
  sudo docker compose up -d db redis
  ```
- Wait for a few seconds:
  ```bash
  sleep 10s
  ```
- Start the remaining services:
  ```bash
  sudo docker compose up -d
  ```
- Wait a few more seconds:
  ```bash
  sleep 5s
  ```

If needed, bring services down and restart:

```bash
sudo docker compose -f docker-compose.yml down
sudo docker compose -f docker-compose.yml up -d
```

To pause services:

```bash
sudo docker compose -f docker-compose.yml pause
```

---

## 🧪 4. Verify Judge0 API

After all containers are up, open your browser and go to:

```
http://localhost:2358/docs
```

You should see the Judge0 API documentation page, meaning your Judge0 instance is running successfully!

---
