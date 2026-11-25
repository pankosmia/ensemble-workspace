import { Typography, Box, Toolbar, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
export default function ToolbarResourceNotSelected() {
  const theme = useTheme();
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
      >
        <Typography sx={{ ml: 3, lineHeight: 1.2 }} variant="body1">
          PSLE
        </Typography>
        <Typography sx={{ lineHeight: 1.2 }} variant="caption">
          Pain sur les eaux
        </Typography>
      </Stack>
    </Toolbar>
  );
}
