import {
  JuxtaDraftingEditor,
  useJuxtaNavigationContext,
} from "pankosmia-juxta-muncher";

import { TextTranslationEditorMuncher } from "pankosmia-text_translation-muncher";
import { useContext } from "react";

import { typographyContext, bcvContext } from "pankosmia-rcl";
export default function PanWorkspaceTileEditor({
  modified,
  setModified,
  metadata,
  bcvRef,
  product,
  debugRef,
  i18nRef,
  currentProjectRef,
}) {
  const { typographyRef } = useContext(typographyContext);
  const { systemBcv } = useContext(bcvContext);
  const navigation = useJuxtaNavigationContext();

  if (metadata) {
    if (metadata.flavor.toLowerCase() === "textTranslation") {
      return (
        <TextTranslationEditorMuncher
          metadata={metadata}
          systemBcv={systemBcv}
          debugRef={debugRef}
          i18nRef={i18nRef}
          product={product}
          typographyRef={typographyRef}
          currentProjectRef={currentProjectRef}
          bcvRef={bcvRef}
        />
      );
    }
    if (metadata.flavor.toLowerCase() === "x-juxtalinear") {
      return (
        <JuxtaDraftingEditor
          key={metadata.local_path}
          modified={modified}
          setModified={setModified}
          navigation={navigation}
          metadata={metadata}
          bcvRef={bcvRef}
          debugRef={debugRef}
          i18nRef={i18nRef}
          currentProjectRef={currentProjectRef}
          navigationEnable={false}
        />
      );
    }
  }
}
