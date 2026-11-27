import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { IconButton } from "@mui/material";
export default function ArrowMenu() {
  return (
    <IconButton
      onClick={(e) => setAnchorEl(e.currentTarget)}
      aria-haspopup="true"
      aria-expanded={open}
      sx={{
        width: 16,
        padding: "4px",
        borderRadius: 0,
        borderStartEndRadius: "4px",
        borderEndEndRadius: "4px",
      }}
    >
      <ArrowDropDownOutlinedIcon
        sx={{ fontSize: 24, stroke: "none", flexShrink: 0 }}
      />
    </IconButton>
  );
}
