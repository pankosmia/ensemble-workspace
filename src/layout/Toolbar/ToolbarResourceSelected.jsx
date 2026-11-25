import EditButton from "./Icons/EditButton";
import ArrowMenu from "./Icons/ArrowMenu";
import { SaveButton, SaveButtonError } from "./Icons/SaveButton";
import { Box, Divider, Toolbar, Typography, useTheme } from "@mui/material";
import PrintButton from "./Icons/PrintButton";
import ExportButton from "./Icons/ExportButton";
import VersionManagerButton from "./Icons/VersionManagerButton";
import MoveButton from "./Icons/MoveButton";
import DeleteButton from "./Icons/DeleteButton";
import AboutButton from "./Icons/AboutButton";
import OverflowButton from "./Icons/OverflowButton";
import { useLayoutEffect, useRef, useState } from "react";

function ToolbarDivider() {
  return (
    <Divider
      orientation="vertical"
      variant="middle"
      flexItem
      sx={{ border: "1px solid rgba(0, 0, 0, 0.12)", mx: "7.5px" }}
    />
  );
}

function ToolbarGroup({ group, showDivider }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        alignSelf: "stretch",
        gap: "2px",
      }}
    >
      {showDivider && <ToolbarDivider />}
      {group.nodes}
    </Box>
  );
}

const overflow_witdh = 34;

function countVisibleGroups(groups, availableWidth) {
  let usedWidth = 0;
  for (let index = 0; index < groups.length; index++) {
    const group = groups[index];
    const isLastGroup = index === groups.length - 1;
    const overflowSpace = isLastGroup ? 0 : overflow_witdh;
    const groupFits = usedWidth + group.width + overflowSpace <= availableWidth;

    if (!groupFits) {
      return index;
    }
    usedWidth = usedWidth + group.width;
  }
  return groups.length;
}

export default function ToolbarResourceSelected({ title, active }) {
  const theme = useTheme();
  const toolbarRef = useRef(null);
  const [unsavedChanges, setUnsavedChanges] = useState(true);
  const [overflowMenu, setOverflowMenu] = useState(false);

  const groups = [
    {
      divider: false,
      width: 86,
      nodes: [
        <EditButton key="edit" />,
        <ArrowMenu key="arrow" />,
        <SaveButton key="save" unsavedChanges={unsavedChanges} />,
      ],
    },
    {
      divider: true,
      width: 120,
      nodes: [
        <PrintButton key="print" />,
        <ExportButton key="export" />,
        <VersionManagerButton key="version" />,
      ],
    },
    {
      divider: true,
      width: 86,
      nodes: [<MoveButton key="move" />, <DeleteButton key="delete" />],
    },
    {
      divider: true,
      width: 52,
      nodes: [<AboutButton key="about" />],
    },
  ];

  const [visibleCount, setVisibleCount] = useState(groups.length);

  useLayoutEffect(() => {
    if (!active || !toolbarRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setVisibleCount(countVisibleGroups(groups, entry.contentRect.width));
    });
    observer.observe(toolbarRef.current);
    return () => observer.disconnect();
  }, [active]);

  const visibleGroups = groups.slice(0, visibleCount);
  const hiddenGroups = groups.slice(visibleCount);
  const hasVisibleGroups = visibleGroups.length > 0;
  const hasHiddenGroups = hiddenGroups.length > 0;

  return (
    <Box
      sx={{
        height: 60,
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
        <Typography variant="caption">{title}</Typography>
      </Toolbar>
      {active && (
        <Toolbar
          ref={toolbarRef}
          disableGutters
          sx={{
            height: 40,
            minHeight: "40px !important",
            backgroundColor: theme.palette.grey[100],
            px: 1,
          }}
        >
          {visibleGroups.map((group) => (
            <ToolbarGroup group={group} showDivider={group.divider} />
          ))}

          {hasHiddenGroups && (
            <>
              {hasVisibleGroups && <ToolbarDivider />}
              <OverflowButton
                overflowMenu={overflowMenu}
                setOverflowMenu={setOverflowMenu}
              >
                {hiddenGroups.map((group, index) => (
                  <ToolbarGroup
                    group={group}
                    showDivider={group.divider && index > 0}
                  />
                ))}
              </OverflowButton>
            </>
          )}
        </Toolbar>
      )}
      {!active && unsavedChanges && (
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
          <SaveButtonError />
        </Toolbar>
      )}
    </Box>
  );
}
