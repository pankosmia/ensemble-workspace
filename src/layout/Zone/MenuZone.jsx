import {
  Box,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Typography,
  ListItemIcon,
  ListItemText,
  Menu,
  Divider,
} from "@mui/material";
import { useState, useContext } from "react";
import IconSetting from "@mui/icons-material/Settings";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { doI18n } from "pankosmia-lib/i18n";
import { i18nContext, PanMenuWrapper } from "pankosmia-rcl";
import RadioButtonChecked from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MoveDownOutlinedIcon from "@mui/icons-material/MoveDownOutlined";
export default function MenuZone() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { i18nRef } = useContext(i18nContext);
  const [selected, setSelected] = useState("name");
  const option_view = [
    { value: "Columns", labelKey: "pages:ensemble-workspace:view_columns" },
    { value: "Rows", labelKey: "pages:ensemble-workspace:view_rows" },
    { value: "Tabs", labelKey: "pages:ensemble-workspace:view_tabs" },
  ];
  return (
    <Box
      sx={{
        position: "absolute",
        right: 0,
        bottom: 0,
        display: "inline-flex",
        background: (theme) => theme.palette.grey[100],
        borderEndEndRadius: "4px",
        borderStartStartRadius: "4px",
      }}
    >
      <IconButton
        sx={{
          padding: "7px",
          borderEndEndRadius: "4px",
          borderStartStartRadius: "4px",
          borderStartEndRadius: "0",
          borderEndStartRadius: "0",
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <MoreVertOutlinedIcon fontSize="small" />
      </IconButton>

      <PanMenuWrapper
        anchorEl={anchorEl}
        isOpen={Boolean(anchorEl)}
        setIsOpen={() => setAnchorEl(null)}
      >
        <MenuItem>
          <ListItemIcon>{<AddOutlinedIcon />}</ListItemIcon>
          <ListItemText>
            {doI18n(
              "pages:ensemble-workspace:add_to_workspace",
              i18nRef.current,
            )}
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>{<MoveDownOutlinedIcon />}</ListItemIcon>
          <ListItemText>
            {doI18n("pages:ensemble-workspace:swap_zone", i18nRef.current)}
          </ListItemText>
        </MenuItem>
        <Divider />
        <Typography variant="subtitle2" sx={{ padding: "8px 16px" }}>
          {doI18n("pages:ensemble-workspace:view", i18nRef.current)}
        </Typography>
        {option_view.map((option) => (
          <MenuItem
            key={option.value}
            role="menuitemradio"
            selected={selected === option.value}
            onClick={() => setSelected(option.value)}
          >
            <ListItemIcon>
              {selected === option.value ? (
                <RadioButtonChecked fontSize="small" />
              ) : (
                <RadioButtonUnchecked fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>
              {doI18n(option.labelKey, i18nRef.current)}
            </ListItemText>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem>
          <ListItemIcon>{<CloseOutlinedIcon />}</ListItemIcon>
          <ListItemText>
            {doI18n("pages:ensemble-workspace:close", i18nRef.current)}
          </ListItemText>
        </MenuItem>
      </PanMenuWrapper>
    </Box>
  );
}
