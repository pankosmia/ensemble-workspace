import { IconButton, Tooltip } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { doI18n } from "pankosmia-lib/i18n";
import { i18nContext } from "pankosmia-rcl";
import { useContext } from "react";

export default function OverflowButton() {
  const { i18nRef } = useContext(i18nContext);
  return (
    <Tooltip
      title={doI18n(
        "pages:ensemble-workspace:overflow_button",
        i18nRef.current,
      )}
    >
      <IconButton
        sx={{
          padding: "4px",
          borderRadius: "4px",
        }}
      >
        <MoreVertOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}
