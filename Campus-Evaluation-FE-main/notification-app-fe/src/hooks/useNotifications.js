import { useState, useEffect, useMemo } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications(filter = "All", page = 1, perPage = 10) {
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchNotifications();
        if (!mounted) return;
        setAllNotifications(data.notifications ?? []);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Something went wrong");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const { filtered, totalFiltered, totalPages } = useMemo(() => {
    const normalizedFilter = (filter || "All").toLowerCase();
    const filteredList = (allNotifications || []).filter((n) => {
      if (!normalizedFilter || normalizedFilter === "all") return true;
      // support different casing/field names from API
      const t = (n.type || n.Type || "").toString().toLowerCase();
      return t === normalizedFilter;
    });

    const totalFiltered = filteredList.length;
    const totalPages = Math.max(1, Math.ceil(totalFiltered / perPage));
    return { filtered: filteredList, totalFiltered, totalPages };
  }, [allNotifications, filter, perPage]);

  const paginated = useMemo(() => {
    const start = Math.max(0, (page - 1) * perPage);
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  return {
    notifications: paginated,
    totalFiltered: filtered.length,
    totalPages,
    loading,
    error,
  };
}