import { AdvancedAppBar, currentProjectContext } from "pankosmia-rcl";
import PanWorkspaceManager from "../layout/PanWorkspaceManager";
import config from "../layout/jsonV1.json";

import { useContext, useState, useEffect } from "react";
import { getJson, postEmpty } from "pankosmia-lib/http";
import { enqueueSnackbar } from "notistack";

import { doI18n } from "pankosmia-lib/i18n";
import NavigationWrapper from "../layout/Navigation/NavigationWrapper";
import { Box } from "@mui/system";
function App() {
  const [currentBurrito, setCurrentBurrito] = useState(null);
  const [modified, setModified] = useState(false);
  const { currentProjectRef } = useContext(currentProjectContext);

  useEffect(() => {
    async function getSummary() {
      if (currentProjectRef.current) {
        const projectPath = `${currentProjectRef.current.source}/${currentProjectRef.current.organization}/${currentProjectRef.current.project}`;
        const fullMetadataResponse = await getJson(
          `/api/burrito/metadata/summary/${projectPath}`,
        );
        if (fullMetadataResponse.ok) {
          const entry = fullMetadataResponse.json;
          setCurrentBurrito([projectPath, entry]);
        } else {
          enqueueSnackbar(
            `${doI18n("pages:core-contenthandler_juxta:error", i18nRef.current)}:  ${responsePost.error.reason} ${fullMetadataResponse.status}`,
            { variant: "error" },
          );
        }
      }
    }

    getSummary();
  }, [currentProjectRef.current]);

  const metadata = currentBurrito && {
    local_path: currentBurrito[0],
    ...currentBurrito[1],
  };

  //setCurrentProject
  useEffect(() => {
    async function setCurrentProject() {
      const src = config.zones[config.layout.editor].tiles[0].src;
      await postEmpty(`/api/app-state/current-project/${src}`);
    }
    setCurrentProject();
  }, []);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <AdvancedAppBar
        navigation={
          metadata && (
            <NavigationWrapper metadata={metadata} modified={modified} />
          )
        }
      />
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <PanWorkspaceManager setModified={setModified} modified={modified} />
      </Box>
    </Box>
  );
}

export default App;
