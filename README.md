# Campus Notifications — Workspace

This workspace contains a small React + Vite + Material UI project for a campus notifications app.

Folders of interest
- `notification-app-fe` — frontend app (Vite + React + MUI)

What I implemented (Stage 1 → Stage 2)
- Notifications list with server-side filtering by type (Placement / Result / Event)
- Pagination (10 items per page)
- Mark notifications as viewed / unviewed
- Priority Notifications page (Placement > Result > Event, newest first)
- Simple logging middleware for API calls and UI actions (console)
- Responsive Material UI components and proper loading/error/empty states

Run the frontend
1. Install dependencies:
```bash
cd notification-app-fe
npm install
```
2. Start dev server:
```bash
npm run dev
```
3. Open the app at the URL printed by Vite (e.g. `http://localhost:5174/`).

Notes
- The API is a local in-memory mock at `src/api/notifications.js`. It supports query params: `limit`, `page`, `notification_type`, and `viewed`.
- Logging functions are in `src/api/logger.js` and print request lifecycle events and UI actions to the console.
- Main pages:
	- `src/pages/NotificationsPage.jsx` — All Notifications with filters and pagination
	- `src/pages/PriorityNotificationsPage.jsx` — Top N priority unread notifications

If you want, I can:
- Open the running app in a browser
- Fix remaining console warnings
- Add navigation between pages
