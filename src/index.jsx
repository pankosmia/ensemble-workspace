import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
// Not used here: pankosmia-text_translation-muncher is excluded from Vite's
// pre-bundling and imports these. Importing them lets Vite's scan pre-bundle
// them (and emotion) so the dev server does not serve raw CommonJS.
import "@mui/material/Box";
import "@mui/material/CircularProgress";
import "@mui/icons-material";
import "@mui/icons-material/ArrowRight";
import "@mui/icons-material/KeyboardArrowLeft";
import "@mui/icons-material/KeyboardArrowRight";
import "@mui/icons-material/SaveOutlined";

import { Spa } from "pankosmia-rcl";
import { SnackbarProvider, MaterialDesignContent } from "notistack";
import App from "./pages/App";
import "./index.css";
import { JuxtaNavigationProvider } from "pankosmia-juxta-muncher";

const CustomSnackbarContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-error": {
    backgroundColor: "#FDEDED",
    color: "#D32F2F",
  },
  "&.notistack-MuiContent-info": {
    backgroundColor: "#E5F6FD",
    color: "#0288D1",
  },
  "&.notistack-MuiContent-warning": {
    backgroundColor: "#FFF4E5",
    color: "#EF6C00",
  },
  "&.notistack-MuiContent-success": {
    backgroundColor: "#EDF7ED",
    color: "#2E7D32",
  },
}));

function AppLayout() {
  return (
    <SnackbarProvider
      Components={{
        error: CustomSnackbarContent,
        info: CustomSnackbarContent,
        warning: CustomSnackbarContent,
        success: CustomSnackbarContent,
      }}
      maxSnack={6}
    >
      <Spa
        titleKey="pages:ensemble-workspace:title"
        currentId="ensemble-workspace"
      >
        <Box sx={{ height: "100%" }}>
          <App />
        </Box>
      </Spa>
    </SnackbarProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <JuxtaNavigationProvider>
      <AppLayout />
    </JuxtaNavigationProvider>
  </HashRouter>,
);
