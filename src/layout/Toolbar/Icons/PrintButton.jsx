import { IconButton, Tooltip } from "@mui/material";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { doI18n } from "pankosmia-lib/i18n";
import { i18nContext } from "pankosmia-rcl";
import { useContext } from "react";

export default function PrintButton() {
  const { i18nRef } = useContext(i18nContext);
  return (
    <Tooltip
      title={doI18n("pages:ensemble-workspace:print_button", i18nRef.current)}
    >
      <IconButton
        sx={{
          padding: "4px",
          borderRadius: "4px",
        }}
      >
        <PrintOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}
