import {
  logApiStart,
  logApiSuccess,
  logApiFailure,
} from "./logger";

// In-memory mock store
const MOCK = [
  {
    ID: "b283218f",
    Type: "Placement",
    Message: "CSX Corporation hiring",
    Timestamp: "2026-04-22T17:51:18Z",
    viewed: false,
  },
  {
    ID: "81589ada",
    Type: "Event",
    Message: "farewell",
    Timestamp: "2026-04-22T17:51:06Z",
    viewed: false,
  },
  {
    ID: "d146095a",
    Type: "Result",
    Message: "mid-sem",
    Timestamp: "2026-04-22T17:51:30Z",
    viewed: true,
  },
  // more sample data to illustrate pagination
  ...Array.from({ length: 22 }).map((_, i) => ({
    ID: `generated-${i}`,
    Type: ["Placement", "Result", "Event"][i % 3],
    Message: `Generated notification ${i}`,
    Timestamp: new Date(Date.now() - i * 1000 * 60).toISOString(),
    viewed: i % 4 === 0,
  })),
];

function sleep(ms = 200) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function fetchNotifications({ limit = 10, page = 1, notification_type, viewed } = {}) {
  const action = "fetchNotifications";
  logApiStart(action, { limit, page, notification_type, viewed });
  try {
    await sleep(200);

    let list = MOCK.slice();
    if (typeof viewed === "boolean") {
      list = list.filter((n) => Boolean(n.viewed) === viewed);
    }

    if (notification_type) {
      const t = notification_type.toString().toLowerCase();
      list = list.filter((n) => (n.Type || "").toLowerCase() === t);
    }

    // sort newest first
    list.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));

    const total = list.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const pageItems = list.slice(start, start + limit);

    const res = { total, totalPages, notifications: pageItems };
    logApiSuccess(action, { resultCount: pageItems.length, total });
    return res;
  } catch (err) {
    logApiFailure(action, err, { limit, page, notification_type, viewed });
    throw err;
  }
}

export async function updateViewedStatus(id, viewed = true) {
  const action = "updateViewedStatus";
  logApiStart(action, { id, viewed });
  try {
    await sleep(100);
    const idx = MOCK.findIndex((m) => m.ID === id);
    if (idx === -1) throw new Error("Not found");
    MOCK[idx].viewed = Boolean(viewed);
    logApiSuccess(action, { id, viewed });
    return { success: true };
  } catch (err) {
    logApiFailure(action, err, { id, viewed });
    throw err;
  }
}

export async function fetchAllUnread() {
  return fetchNotifications({ limit: 1000, page: 1, viewed: false });
}