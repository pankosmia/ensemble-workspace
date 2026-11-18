import {
  AdvancedAppBar,
  i18nContext,
  currentProjectContext,
  bcvContext,
  debugContext,
} from "pankosmia-rcl";
import PanWorkspaceManager from "../layout/PanWorkspaceManager";
import config from "../layout/jsonV1.json";

import {
  JuxtaNavigation,
  useJuxtaNavigationContext,
} from "pankosmia-juxta-muncher";

import { useContext, useState, useEffect } from "react";
import { getJson, postEmpty } from "pankosmia-lib/http";
import { enqueueSnackbar } from "notistack";

import { doI18n } from "pankosmia-lib/i18n";
function App() {
  const { bcvRef } = useContext(bcvContext);
  const { debugRef } = useContext(debugContext);
  const { i18nRef } = useContext(i18nContext);
  const { currentProjectRef } = useContext(currentProjectContext);
  const [currentBurrito, setCurrentBurrito] = useState(null);
  const navigation = useJuxtaNavigationContext();
  const [modified, setModified] = useState(false);

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
    <>
      <AdvancedAppBar
        navigation={
          metadata && (
            <JuxtaNavigation
              metadata={metadata}
              modified={modified}
              {...navigation}
              bcvRef={bcvRef}
              debugRef={debugRef}
              i18nRef={i18nRef}
              currentProjectRef={currentProjectRef}
            />
          )
        }
      />
      <PanWorkspaceManager setModified={setModified} modified={modified} />;
    </>
  );
}

export default App;
