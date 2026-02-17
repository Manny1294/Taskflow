# TaskFlow Frontend

Minimal React + Vite frontend for the TaskFlow interview project.

This UI connects to the backend API and provides:
- Task Page (`/tasks`) to list tasks, create a task, and mark task as completed
- Admin Export Page (`/export`) to trigger export, check job status, and download CSV

## Tech Stack
- React
- Vite
- React Router

## Prerequisites
- Node.js 18+
- TaskFlow backend running

## Setup
1. Install dependencies:
```bash
npm install
```

2. Create local env file from template:
```bash
cp .env.example .env
```

3. (Optional) update `.env` values for your local setup.

4. Start frontend:
```bash
npm run dev
```

## Environment Variables
See `.env.example`:
- `VITE_API_BASE_URL` - backend API base URL
- `VITE_TENANT_ID` - active tenant id for request headers
- `VITE_USER_ID` - active user id for request headers
- `VITE_USER_ROLE` - UI role hint (`admin` or `member`)

## Run With Backend
1. Start backend (`taskflow-backend`):
```bash
npm run dev
```

2. Start frontend (this repo):
```bash
npm run dev
```

3. Open:
```text
http://localhost:5173/tasks
```

## Tenant/User Switching
Update `.env`, then restart frontend:
- `VITE_TENANT_ID`
- `VITE_USER_ID`
- `VITE_USER_ROLE`

## Scripts
- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
