import PanWorkspaceTileEditor from "./PanWorkspaceTileEditor";
import PanWorkspaceTileViewer from "./PanWorskpaceTileViewer";

export default function PanWorkspaceTile({
  modified,
  setModified,
  metadata,
  bcvRef,
  debugRef,
  i18nRef,
  currentProjectRef,
  product,
  isEditor,
}) {
  return isEditor ? (
    <PanWorkspaceTileEditor
      modified={modified}
      setModified={setModified}
      metadata={metadata}
      bcvRef={bcvRef}
      product={product}
      debugRef={debugRef}
      i18nRef={i18nRef}
      currentProjectRef={currentProjectRef}
    />
  ) : (
    <PanWorkspaceTileViewer
      metadata={metadata}
      bcvRef={bcvRef}
      debugRef={debugRef}
      i18nRef={i18nRef}
      currentProjectRef={currentProjectRef}
    />
  );
}
