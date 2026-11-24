import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { doI18n } from "pankosmia-lib/i18n";
import { i18nContext } from "pankosmia-rcl";
import { useContext } from "react";
export default function SaveButton() {
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
