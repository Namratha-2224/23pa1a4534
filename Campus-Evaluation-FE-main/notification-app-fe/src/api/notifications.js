export async function fetchNotifications() {
  return {
    total: 3,
    notifications: [
      {
        ID: "b283218f",
        Type: "Placement",
        Message: "CSX Corporation hiring",
        Timestamp: "2026-04-22 17:51:18",
      },
      {
        ID: "81589ada",
        Type: "Event",
        Message: "farewell",
        Timestamp: "2026-04-22 17:51:06",
      },
      {
        ID: "d146095a",
        Type: "Result",
        Message: "mid-sem",
        Timestamp: "2026-04-22 17:51:30",
      },
    ],
  };
}