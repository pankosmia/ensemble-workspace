import { createRoot } from "react-dom/client";
import {
  Spa
} from "pankosmia-rcl";
import { SnackbarProvider } from "notistack";
import App from "./App";
import "./index.css";
import {JuxtaNavigationProvider } from "pankosmia-juxta-muncher";

function AppLayout() {

  return (
    <SnackbarProvider maxSnack={6}>
      <Spa
        titleKey="pages:ensemble-workspace:title"
        currentId="ensemble-workspace"
      >

        <App />
      </Spa>
    </SnackbarProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <JuxtaNavigationProvider>
    <AppLayout />
  </JuxtaNavigationProvider>,
);
