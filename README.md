# TeamFlow — Full-Stack Task Management

A portfolio-ready task-management application built with **Java 21, Spring Boot, React, JavaScript, H2/PostgreSQL, Docker, and GitHub Actions**.

## Features

- Create, edit, delete, search, and filter tasks
- Track status, priority, assignee, description, and due date
- Dashboard metrics for total, active, overdue, and completed tasks
- REST API with validation and centralized error handling
- Responsive React interface
- H2 database for zero-configuration local development
- PostgreSQL profile for Docker deployment
- Backend integration tests and automated CI build

## Architecture

```text
React frontend (port 5173)
        |
        | REST /api
        v
Spring Boot backend (port 8080)
        |
        +-- H2 (local)
        +-- PostgreSQL (Docker)
```

## Run locally

### Prerequisites

- Java 21+
- Maven 3.9+
- Node.js 22+
- npm 10+

### 1. Start the backend

```bash
cd backend
mvn spring-boot:run
```

Backend API: `http://localhost:8080/api/tasks`
H2 console: `http://localhost:8080/h2-console`

H2 credentials:

```text
JDBC URL: jdbc:h2:mem:teamflow
User: sa
Password: (leave blank)
```

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Run with Docker

```bash
docker compose up --build
```

Open `http://localhost:3000`.

## REST endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | List/search/filter tasks |
| GET | `/api/tasks/{id}` | Get one task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/{id}` | Update a task |
| DELETE | `/api/tasks/{id}` | Delete a task |
| GET | `/api/tasks/stats` | Dashboard metrics |

Example filter:

```text
GET /api/tasks?status=IN_PROGRESS&priority=HIGH&search=API
```


## Publish to GitHub

Create an empty repository on GitHub, then run these commands from this project folder:

```bash
git init
git add .
git commit -m "Initial full-stack application"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Before publishing, replace the author name or repository URL anywhere you want to personalize it.

## Suggested GitHub repository description

> Full-stack task-management dashboard built with Java, Spring Boot, React, JavaScript, REST APIs, PostgreSQL, Docker, and CI.

## Resume-ready bullets

- Developed a full-stack task-management application with Java, Spring Boot, React, and PostgreSQL, supporting CRUD operations, multi-field filtering, dashboard analytics, and responsive workflows.
- Designed 6 REST endpoints with bean validation, centralized exception handling, H2/PostgreSQL profiles, Dockerized deployment, and automated backend/frontend CI checks.
