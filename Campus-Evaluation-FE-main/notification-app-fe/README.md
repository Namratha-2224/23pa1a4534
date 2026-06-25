# Notification App (Frontend)

This is the frontend for the Campus Notifications app. It's built with Vite, React, and Material UI.

Quick start
1. Install dependencies
```bash
cd notification-app-fe
npm install
```

2. Start dev server
```bash
npm run dev
```

3. Open the URL printed by Vite (e.g. `http://localhost:5174/`).

What this project includes
- `src/pages/NotificationsPage.jsx` — All notifications view with filtering and pagination
- `src/pages/PriorityNotificationsPage.jsx` — Top N unread priority notifications (Placement > Result > Event)
- `src/components/NotificationFilter.jsx` — Toggle buttons for filtering
- `src/components/NotificationCard.jsx` — Material UI card that displays a notification and lets you mark viewed/unviewed
- `src/hooks/useNotifications.js` — Hook that fetches notifications from `src/api/notifications.js` with support for `limit`, `page`, `notification_type`, and `viewed`
- `src/api/notifications.js` — In-memory mock API with logging and status updates
- `src/api/logger.js` — Console logging helpers for API and UI actions

Notes
- API is a mock (in-memory) for development. It supports query parameters: `limit`, `page`, `notification_type`, and `viewed`.
- Logging prints to the browser console and server console for request start/success/failure and UI actions.
- The app uses Material UI for styling and is responsive across desktop and mobile breakpoints.

Next steps you might want
- Add routing (React Router) to navigate between `NotificationsPage` and `PriorityNotificationsPage`.
- Connect `src/api/notifications.js` to a real backend.
- Replace console logging with a structured logging/telemetry service.

If you want, I can add routing and a small navbar to switch pages next.
