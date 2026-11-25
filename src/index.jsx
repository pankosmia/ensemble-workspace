import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
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
