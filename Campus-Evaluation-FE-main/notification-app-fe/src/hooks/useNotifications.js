import { useState, useEffect, useCallback } from "react";
import { fetchNotifications, updateViewedStatus } from "../api/notifications";
import { logUiAction } from "../api/logger";

export function useNotifications(filter = "All", page = 1, perPage = 10) {
  const [notifications, setNotifications] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        limit: perPage,
        page,
      };
      if (filter && filter !== "All") params.notification_type = filter;

      logUiAction && logUiAction("fetch_notifications", params);
      const res = await fetchNotifications(params);
      setNotifications(res.notifications ?? []);
      setTotalPages(res.totalPages ?? 1);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }, [filter, page, perPage]);

  useEffect(() => {
    load();
  }, [load]);

  const markViewed = useCallback(
    async (id, viewed = true) => {
      try {
        // optimistic update
        setNotifications((prev) => prev.map((n) => (n.ID === id ? { ...n, viewed } : n)));
        await updateViewedStatus(id, viewed);
      } catch (err) {
        // revert on error: reload
        load();
        throw err;
      }
    },
    [load]
  );

  const refresh = useCallback(() => load(), [load]);

  return {
    notifications,
    totalPages,
    loading,
    error,
    markViewed,
    refresh,
  };
}