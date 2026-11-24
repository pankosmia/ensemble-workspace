// DoubleToolbar.jsx
import EditButton from "./Icons/EditButton";
import ArrowMenu from "./Icons/ArrowMenu";
import SaveButton from "./Icons/SaveButton";
import { Box, Divider, Toolbar, Typography, useTheme } from "@mui/material";
import PrintButton from "./Icons/PrintButton";
import ExportButton from "./Icons/ExportButton";
import VersionManagerButton from "./Icons/VersionManagerButton";
import MoveButton from "./Icons/MoveButton";
import DeleteButton from "./Icons/DeleteButton";
import AboutButton from "./Icons/AboutButton";
export default function ToolbarResourceSelected({ title, children }) {
  const theme = useTheme();

  return (
    <Box sx={{ height: 60, display: "flex", flexDirection: "column" }}>
      {/* Toolbar du haut : 20px */}
      <Toolbar
        disableGutters
        sx={{
          height: 20,
          minHeight: "20px !important",
          backgroundColor: theme.palette.grey[200],
          justifyContent: "center",
        }}
      >
        <Typography variant="caption">Pain sur les eaux</Typography>
      </Toolbar>

      {/* Toolbar du bas : 44px */}
      <Toolbar
        disableGutters
        sx={{
          height: 40,
          minHeight: "40px !important",
          backgroundColor: theme.palette.grey[100],
          px: 1,
          gap: "2px",
        }}
      >
        <EditButton />
        <ArrowMenu />
        <SaveButton />
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ mx: 2 }}
        />
        <PrintButton />
        <ExportButton />
        <VersionManagerButton />
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ mx: 2 }}
        />
        <MoveButton />
        <DeleteButton />
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ mx: 2 }}
        />
        <AboutButton />
      </Toolbar>
    </Box>
  );
}
