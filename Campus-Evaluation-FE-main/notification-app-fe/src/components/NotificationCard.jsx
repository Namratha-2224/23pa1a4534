import { Card, CardContent, IconButton, Stack, Typography, Chip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export function NotificationCard({ notification, onToggleViewed }) {
  const id = notification?.ID ?? notification?.id ?? "";
  const type = notification?.Type ?? notification?.type ?? "";
  const message = notification?.Message ?? notification?.message ?? notification?.title ?? "";
  const ts = notification?.Timestamp ?? notification?.timestamp ?? "";
  const viewed = Boolean(notification?.viewed);

  return (
    <Card variant="outlined" sx={{ bgcolor: viewed ? "background.paper" : "rgba(25,118,210,0.04)" }}>
      <CardContent>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" justifyContent="space-between" spacing={1}>
          <Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label={type} size="small" color={viewed ? "default" : "primary"} />
              {!viewed && <Chip label="New" size="small" color="secondary" />}
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {new Date(ts).toLocaleString()}
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ mt: 1 }}>{message}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>ID: {id}</Typography>
          </Stack>

          <IconButton
            edge="end"
            aria-label={viewed ? "mark as unviewed" : "mark as viewed"}
            onClick={() => onToggleViewed && onToggleViewed(id, !viewed)}
          >
            {viewed ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}