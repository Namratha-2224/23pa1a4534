import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { NotificationCard } from "../components/NotificationCard";
import { fetchNotifications, updateViewedStatus } from "../api/notifications";
import { logUiAction } from "../api/logger";

const PRIORITY = { Placement: 3, Result: 2, Event: 1 };

export function PriorityNotificationsPage({ top = 5 }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      logUiAction && logUiAction("fetch_priority_notifications", { top });
      const res = await fetchNotifications({ limit: 1000, page: 1, viewed: false });
      let list = res.notifications ?? [];
      list.sort((a, b) => {
        const pa = PRIORITY[a.Type] ?? 0;
        const pb = PRIORITY[b.Type] ?? 0;
        if (pa !== pb) return pb - pa; // higher priority first
        return new Date(b.Timestamp) - new Date(a.Timestamp);
      });
      setItems(list.slice(0, top));
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [top]);

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <NotificationsActiveIcon sx={{ fontSize: 28 }} />
        <Typography variant="h5" fontWeight={700}>
          Priority Notifications
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && items.length === 0 && (
        <Alert severity="info">No priority notifications found</Alert>
      )}

      {!loading && !error && items.length > 0 && (
        <Stack spacing={1.5}>
          {items.map((n) => (
            <NotificationCard
              key={n.ID}
              notification={n}
              onToggleViewed={async (id, viewed) => {
                try {
                  logUiAction("priority_toggle_viewed", { id, viewed });
                  await updateViewedStatus(id, viewed);
                  load();
                } catch (err) {
                  console.error(err);
                }
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
