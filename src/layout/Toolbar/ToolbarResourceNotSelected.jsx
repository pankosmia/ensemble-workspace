import { Typography, Box, Toolbar, useTheme } from "@mui/material";
export default function ToolbarResourceNotSelected() {
  const theme = useTheme();
  return (
    <Toolbar
      sx={{
        height: 64,
        backgroundColor: theme.palette.grey[200],
        justifyContent: "center",
        paddingLeft: 1,
        paddingRight: 1,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography sx={{ ml: 3 }} variant="body1">
          PSLE
        </Typography>
        <Typography variant="caption">Pain sur les eaux</Typography>
      </Box>
    </Toolbar>
  );
}
