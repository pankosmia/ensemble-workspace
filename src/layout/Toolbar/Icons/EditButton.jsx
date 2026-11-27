import { ToggleButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { doI18n } from "pankosmia-lib/i18n";
import { i18nContext } from "pankosmia-rcl";
import { useContext } from "react";
export default function EditButton() {
  const { i18nRef } = useContext(i18nContext);
  return (
    <Tooltip
      title={doI18n("pages:ensemble-workspace:edit_button", i18nRef.current)}
    >
      <ToggleButton
        value="edit"
        //selected={selected}
        //onChange={onChange}
        sx={{
          padding: "4px",
          borderStartEndRadius: 0,
          borderEndEndRadius: 0,
          border: "none",
        }}
      >
        <EditOutlinedIcon sx={{ stroke: "none" }} />
      </ToggleButton>
    </Tooltip>
  );
}
