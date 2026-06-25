export function NotificationCard({ notification }) {
  const id = notification?.ID ?? notification?.id ?? "";
  const type = notification?.Type ?? notification?.type ?? "";
  const message = notification?.Message ?? notification?.message ?? notification?.title ?? "";
  const ts = notification?.Timestamp ?? notification?.timestamp ?? "";

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "16px",
        marginBottom: "10px",
        borderRadius: "8px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{type}</strong>
        <small>{ts}</small>
      </div>
      <div style={{ marginTop: 8 }}>{message}</div>
      <div style={{ marginTop: 8, color: "#666", fontSize: 12 }}>ID: {id}</div>
    </div>
  );
}