# TeamFlow Portfolio Talking Points

## Problem
Teams need a lightweight way to track ownership, priority, due dates, and delivery status without relying on spreadsheets.

## Technical decisions
- Spring Boot provides a layered controller/service/repository backend.
- React uses reusable components and a single API module.
- H2 makes the project runnable immediately; PostgreSQL demonstrates production-style persistence.
- Docker Compose runs the frontend, backend, and database together.

## Interview discussion
Explain how filtering is performed, how validation errors are returned, how overdue tasks are calculated, and how the frontend refreshes statistics after mutations.
