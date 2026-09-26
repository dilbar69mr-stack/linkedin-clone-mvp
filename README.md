# LinkedIn Clone MVP

A polished LinkedIn-inspired professional networking app starter built as a full-stack MVP.

## Current status

- Frontend scaffold is live with a home feed, profile, network, jobs, and messaging screens
- Backend API is active with health and sample auth/data endpoints
- Project is structured as a monorepo with separate frontend and backend workspaces

## Stack

- Frontend: React + Vite + TypeScript + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL planned for the next phase
- Auth: JWT-ready starter endpoints
- Real-time: Socket.IO-ready architecture for chats and notifications

## Repository structure

- `frontend/` - React application UI and pages
- `backend/` - Express API server
- `README.md` - project overview and roadmap

## Quick start

From the repo root:

```bash
npm install
npm run dev
```

This runs the frontend on `http://localhost:5173` and the backend on `http://localhost:4000`.

## MVP roadmap

1. Authentication and user profiles
2. Post feed and interactions
3. Connections and network suggestions
4. Jobs and applications
5. Messaging and notifications
6. Deployment and polish

## Notes

This version uses mock data to give you a working app foundation. The next phase adds a real PostgreSQL schema, Prisma, secure auth, and production-ready APIs.
