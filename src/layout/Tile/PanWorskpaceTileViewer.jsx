import { JuxtalinearViewerMuncher } from "pankosmia-juxta-muncher";
import { snippetContext, wordContext, bcvContext } from "pankosmia-rcl";
import { TextTranslationViewerMuncher } from "pankosmia-text_translation-muncher";
import { useContext } from "react";

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
        <TextTranslationViewerMuncher
          metadata={metadata}
          debugRef={debugRef}
          systemBcv={systemBcv}
          i18nRef={i18nRef}
          snippet={snippet}
          word={word}
        />
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
