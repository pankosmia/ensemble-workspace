import { JuxtalinearViewerMuncher } from "pankosmia-juxta-muncher";
import { TextTranslationViewerMuncher } from "pankosmia-text_translation-muncher";
import { useContext } from "react";
import { snippetContext, wordContext, bcvContext } from "pankosmia-rcl";
import { Box } from "@mui/system";

export default function PanWorkspaceTileViewer({
  metadata,
  bcvRef,
  debugRef,
  i18nRef,
  currentProjectRef,
}) {
  const { snippet } = useContext(snippetContext);
  const { word } = useContext(wordContext);
  const { systemBcv } = useContext(bcvContext);

  if (metadata) {
    if (metadata.flavor === "textTranslation") {
      return (
        <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
          <TextTranslationViewerMuncher
            metadata={metadata}
            debugRef={debugRef}
            systemBcv={systemBcv}
            i18nRef={i18nRef}
            snippet={snippet}
            word={word}
          />
        </Box>
      );
    }
    if (metadata.flavor.toLowerCase() === "x-juxtalinear") {
      return (
        <JuxtalinearViewerMuncher
          metadata={metadata}
          bcvRef={bcvRef}
          debugRef={debugRef}
          i18nRef={i18nRef}
          currentProjectRef={currentProjectRef}
        />
      );
    }
  }
}
