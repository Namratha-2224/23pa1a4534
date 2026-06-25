import { useState, useEffect } from "react";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";
import { logUiAction } from "../api/logger";

export function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const { notifications, totalPages, loading, error, markViewed, refresh } = useNotifications(
    filter,
    page,
    10
  );

  const [unreadCount, setUnreadCount] = useState(0);

  // load total unread count for badge
  useEffect(() => {
    let mounted = true;
    import("../api/notifications").then(async (mod) => {
      try {
        const res = await mod.fetchNotifications({ limit: 1000, page: 1, viewed: false });
        if (mounted) setUnreadCount(res.total ?? 0);
      } catch (e) {
        if (mounted) setUnreadCount(0);
      }
    });
    return () => (mounted = false);
  }, [notifications]);

  const handleFilterChange = (newFilter) => {
    // ToggleButtonGroup may return null when deselected; treat as 'All'
    const resolved = newFilter ?? "All";
    setFilter(resolved);
    setPage(1);
    logUiAction("filter_change", { filter: resolved });
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
    logUiAction("page_change", { page: newPage });
  };

  // keep page within bounds if totalPages shrinks
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <Badge badgeContent={unreadCount} color="primary" max={99}>
          <NotificationsIcon sx={{ fontSize: 28 }} />
        </Badge>
        <Typography variant="h5" fontWeight={700}>
          Notifications
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ marginBottom: 3 }}>
        <NotificationFilter value={filter} onChange={handleFilterChange} />
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">
          Failed to load notifications: {error}
        </Alert>
      )}

      {!loading && !error && notifications.length > 0 && (
        <Stack spacing={1.5}>
          {notifications.map((n) => (
            <NotificationCard
              key={n.ID ?? n.id ?? n.key ?? Math.random()}
              notification={n}
              onToggleViewed={async (id, viewed) => {
                try {
                  logUiAction("toggle_viewed", { id, viewed });
                  await markViewed(id, viewed);
                  // refresh the list and unread count
                  refresh();
                } catch (err) {
                  console.error(err);
                }
              }}
            />
          ))}
        </Stack>
      )}

      {!loading && !error && notifications.length === 0 && (
        <Alert severity="info">No notifications found</Alert>
      )}
      

      {!loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}