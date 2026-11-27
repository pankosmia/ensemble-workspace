import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Badge, IconButton, Tooltip, Typography } from "@mui/material";
import { doI18n } from "pankosmia-lib/i18n";
import { i18nContext } from "pankosmia-rcl";
import { useContext, useLayoutEffect, useRef, useState } from "react";

function SaveButton({ unsavedChanges }) {
  const { i18nRef } = useContext(i18nContext);

  return (
    <Tooltip
      title={doI18n("pages:ensemble-workspace:save_button", i18nRef.current)}
    >
      <IconButton
        sx={{
          padding: "4px",
          borderRadius: "4px",
        }}
      >
        <Badge invisible={!unsavedChanges} color="error" variant="dot">
          <SaveOutlinedIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}

function SaveButtonError() {
  const { i18nRef } = useContext(i18nContext);
  const chipRef = useRef(null);
  const [iconOnly, setIconOnly] = useState(false);
  const message = doI18n(
    "pages:ensemble-workspace:unsaved_changes",
    i18nRef.current,
  );

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setIconOnly(entry.contentRect.width < 140);
    });
    observer.observe(chipRef.current.parentElement);
    return () => observer.disconnect();
  }, []);

  return (
    <Tooltip title={iconOnly ? message : ""}>
      <Typography
        ref={chipRef}
        variant="caption"
        sx={{
          px: 1,
          borderRadius: "4px",
          bgcolor: "#FDEDED",
          color: "text.primary",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          "& svg": {
            width: "20px",
            height: "20px",
            flexShrink: 0,
          },
        }}
      >
        <SaveOutlinedIcon color="error" />
        {!iconOnly && <span style={{ whiteSpace: "nowrap" }}>{message}</span>}
      </Typography>
    </Tooltip>
  );
}
export { SaveButton, SaveButtonError };
