import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Badge, IconButton, Tooltip, Typography } from "@mui/material";
import { doI18n } from "pankosmia-lib/i18n";
import { i18nContext } from "pankosmia-rcl";
import { useContext } from "react";

function SaveButton() {
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
        <Badge color="error" variant="dot">
          <SaveOutlinedIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}

function SaveButtonError() {
  const { i18nRef } = useContext(i18nContext);
  return (
    <Typography
      variant="caption"
      sx={{
        px: 1,
        borderRadius: "4px",
        bgcolor: "#FDEDED",
        color: "text.primary",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        minWidth: 0,
        "& svg": {
          width: "20px",
          height: "20px",
          flexShrink: 0,
        },
        "@container (max-width: 140px)": {
          "& .save-error-label": { display: "none" },
        },
      }}
    >
      <SaveOutlinedIcon color="error" />

      <span
        className="save-error-label"
        style={{
          minWidth: 0,
          whiteSpace: "nowrap",
        }}
      >
        {doI18n("pages:ensemble-workspace:unsaved_changes", i18nRef.current)}
      </span>
    </Typography>
  );
}
export { SaveButton, SaveButtonError };
