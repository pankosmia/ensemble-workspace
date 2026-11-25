import { Box, IconButton, Popover, Stack, Tooltip } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { doI18n } from "pankosmia-lib/i18n";
import { i18nContext } from "pankosmia-rcl";
import { useContext } from "react";

export default function OverflowButton({
  children,
  overflowMenu,
  setOverflowMenu,
}) {
  const anchorEl = overflowMenu;
  const { i18nRef } = useContext(i18nContext);
  return (
    <Box sx={{ display: "contents" }}>
      <Tooltip
        title={doI18n(
          "pages:ensemble-workspace:overflow_button",
          i18nRef.current,
        )}
      >
        <IconButton
          onClick={(e) => setOverflowMenu(e.currentTarget)}
          sx={{
            padding: "4px",
            borderRadius: "4px",
          }}
        >
          <MoreVertOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setOverflowMenu(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing="2px"
          sx={{ p: 0.5 }}
        >
          {children}
        </Stack>
      </Popover>
    </Box>
  );
}
