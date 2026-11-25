// DoubleToolbar.jsx
import EditButton from "./Icons/EditButton";
import ArrowMenu from "./Icons/ArrowMenu";
import { SaveButton, SaveButtonError } from "./Icons/SaveButton";
import {
  Box,
  Divider,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PrintButton from "./Icons/PrintButton";
import ExportButton from "./Icons/ExportButton";
import VersionManagerButton from "./Icons/VersionManagerButton";
import MoveButton from "./Icons/MoveButton";
import DeleteButton from "./Icons/DeleteButton";
import AboutButton from "./Icons/AboutButton";
import OverflowButton from "./Icons/OverflowButton";
import { useState } from "react";

export default function ToolbarResourceSelected({ title, children, active }) {
  const theme = useTheme();
  const overflowing = useMediaQuery(theme.breakpoints.down("sm"));
  const [overflowMenu, setOverflowMenu] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  return (
    <Box
      sx={{
        height: active ? 60 : 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
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
      {active && (
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
          {!overflowing && (
            <>
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
            </>
          )}
          {overflowing && (
            <>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ mx: 2 }}
              />{" "}
              <OverflowButton
                overflowMenu={overflowMenu}
                setOverflowMenu={setOverflowMenu}
              />
            </>
          )}
        </Toolbar>
      )}
      {active && unsavedChanges && (
        <Toolbar
          disableGutters
          sx={{
            height: 40,
            minHeight: "40px !important",
            backgroundColor: theme.palette.grey[100],
            px: 1,
            gap: "2px",
            containerType: "inline-size",
          }}
        >
          <SaveButtonError />
        </Toolbar>
      )}
    </Box>
  );
}
