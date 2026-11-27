import { IconButton, SvgIcon, Tooltip } from "@mui/material";
import { doI18n } from "pankosmia-lib/i18n";
import { i18nContext } from "pankosmia-rcl";
import { useContext } from "react";
export default function ExportButton() {
  const { i18nRef } = useContext(i18nContext);
  return (
    <Tooltip
      title={doI18n("pages:ensemble-workspace:export_button", i18nRef.current)}
    >
      <IconButton
        sx={{
          padding: "4px",
          borderRadius: "4px",
        }}
      >
        <SvgIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="24px"
            width="24px"
            fill="currentColor"
          >
            <path d="M7,15V9Q7,8.17 7.59,7.59T9,7h8.15L14.58,4.42L16,3l5,5l-5,5l-1.42-1.4L17.15,9H9v6H7ZM5,21q-0.83,0-1.41-0.59T3,19V4H5V19H17V15h2v4q0,0.82-0.59,1.41T17,21H5Z" />
          </svg>
        </SvgIcon>
      </IconButton>
    </Tooltip>
  );
}
