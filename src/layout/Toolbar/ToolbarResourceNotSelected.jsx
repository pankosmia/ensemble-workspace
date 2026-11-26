import { useState } from "react";
import { Typography, Box, Toolbar, Tooltip, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
export default function ToolbarResourceNotSelected({ metadata }) {
  const theme = useTheme();
  const [isTruncated, setIsTruncated] = useState(false);
  const title = metadata?.name;
  const abbreviation = metadata?.abbreviation;
  return (
    <Toolbar
      sx={{
        height: 60,
        minHeight: "60px !important",
        backgroundColor: theme.palette.grey[200],
        justifyContent: "center",
        paddingLeft: 1,
        paddingRight: 1,
      }}
    >
      <Stack
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minWidth: 0, maxWidth: "100%", px: 1 }}
      >
        <Typography sx={{ ml: 3, lineHeight: 1.2 }} variant="body1">
          {abbreviation}
        </Typography>
        <Tooltip title={isTruncated ? title : ""}>
          <Typography
            variant="caption"
            onMouseEnter={(e) =>
              setIsTruncated(
                e.currentTarget.scrollWidth > e.currentTarget.clientWidth,
              )
            }
            sx={{
              display: "block",
              maxWidth: "100%",
              lineHeight: 1.2,
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>
        </Tooltip>
      </Stack>
    </Toolbar>
  );
}
