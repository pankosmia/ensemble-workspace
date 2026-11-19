import {
  JuxtaNavigation,
  useJuxtaNavigationContext,
} from "pankosmia-juxta-muncher";

import {
  i18nContext,
  currentProjectContext,
  bcvContext,
  debugContext,
} from "pankosmia-rcl";
import { useContext, useState } from "react";
import { TextTranslationNavigation } from "pankosmia-text_translation-muncher";
export default function NavigationWrapper({ metadata, modified }) {
  const navigationJuxta = useJuxtaNavigationContext();
  const { bcvRef, systemBcv } = useContext(bcvContext);
  const { debugRef } = useContext(debugContext);
  const { i18nRef } = useContext(i18nContext);
  const { currentProjectRef } = useContext(currentProjectContext);
  const [currentBookCode, setCurrentBookCode] = useState("zzz");

  if (metadata.flavor.toLowerCase() === "x-juxtalinear") {
    return (
      <JuxtaNavigation
        metadata={metadata}
        modified={modified}
        {...navigationJuxta}
        bcvRef={bcvRef}
        debugRef={debugRef}
        i18nRef={i18nRef}
        currentProjectRef={currentProjectRef}
      />
    );
  }
  if (metadata.flavor === "textTranslation") {
    return (
      <TextTranslationNavigation
        metadata={metadata}
        systemBcv={systemBcv}
        currentBookCode={currentBookCode}
        setCurrentBookCode={setCurrentBookCode}
        debugRef={debugRef}
        i18nRef={i18nRef}
        currentProjectRef={currentProjectRef}
        bcvRef={bcvRef}
      />
    );
  }
}
