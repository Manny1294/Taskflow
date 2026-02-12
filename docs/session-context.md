# TaskFlow Session Context

Session ID: `taskflow-prd-v1`
Created: 2026-02-12

## Purpose
Use this file as persistent project context so you do not need to paste the full PRD in every new Codex session.

## Quick Start For New Sessions
Use this exact prompt:

`Use session id taskflow-prd-v1 and read docs/session-context.md before doing anything.`

## Product Context (PRD Snapshot)
- Project: TaskFlow
- Version: 1.0 (MVP)
- Timeline: 7 days
- Platform: Web application (desktop + mobile responsive)
- Target users: small teams and individuals

## Core Tech Stack
- React 18+
- Vite
- React Router v6
- Tailwind CSS
- localStorage persistence

## MVP Requirements
1. Task CRUD
- Task fields: `id`, `title`, `description`, `status`, `priority`, `createdAt`, `updatedAt`
- Actions: create, read, update, delete, toggle completion

2. Task Filtering
- Filters: `all`, `todo`, `in-progress`, `done`

3. Routing
- Routes: `/`, `/tasks`, `/tasks/new`, `/tasks/:id`, `*`

4. Data Persistence
- Storage key: `taskflow_tasks`
- Auto-save on task changes
- Load tasks on app initialization
- Reusable custom hook: `useLocalStorage`

5. Theme
- Light and dark mode
- Persist key: `taskflow_theme`
- Global state via Context API

6. User Name Entry
- First-visit modal for name input
- Persist key: `taskflow_user`
- Show "Welcome, [Name]" in navbar

## Development Roadmap Status
- Day 1-3: Mostly complete in this repo (core CRUD/edit/toggle exists)
- Day 4: Active target (filtering + localStorage persistence)
- Day 5+: Routing/pages, then context/theme/user modal

## User Coding Preferences
- Beginner-friendly code
- Clear comments that explain what and why
- Scalable structure (reusable hooks/components, separated concerns)

## Working Agreement
- Read this file first in every new session.
- Update this file when scope or priorities change significantly.
