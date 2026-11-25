import { Group } from "react-resizable-panels";
import PanWorkspaceTile from "../Tile/PanWorkspaceTile";
import { Separator } from "react-resizable-panels";
import { Panel } from "react-resizable-panels";
import { useEffect, useState, useContext } from "react";
import ToolbarResourceNotSelected from "../Toolbar/ToolbarResourceNotSelected";
import ToolbarResourceSelected from "../Toolbar/ToolbarResourceSelected";
import {
  bcvContext,
  debugContext,
  i18nContext,
  currentProjectContext,
  productContext,
} from "pankosmia-rcl";
import { Toolbar } from "@mui/material";

export default function PanWorkspaceZone({
  zone,
  summaries,
  zoneID,
  layout,
  onRemoveZone,
  setModified,
  modified,
  activeZoneId,
  setActiveZoneId,
}) {
  const { bcvRef } = useContext(bcvContext);
  const { debugRef } = useContext(debugContext);
  const { i18nRef } = useContext(i18nContext);
  const { currentProjectRef } = useContext(currentProjectContext);
  const { product } = useContext(productContext);

  const metadata = {
    ...summaries[zone.tiles[0].src],
    local_path: zone.tiles[0].src,
  };
  const [tileUi, setTileUi] = useState(null);

  useEffect(() => {
    async function test() {
      let { tiles } = zone;
      setTileUi([...tiles]);
    }
    test();
  }, [zone]);

  function addTile() {
    setTileUi((prev) => [
      ...prev,
      { name: "bla", id: prev.length + 1, src: "local" },
    ]);
  }
  function removeTile(id) {
    let removeIndexTile = tileUi.findIndex((e) => e.id === id);
    setTileUi((prev) => {
      let prev2 = [...prev];
      prev2.splice(removeIndexTile, 1);
      return prev2;
    });
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        outline: activeZoneId === zoneID ? "2px solid #1976d2" : "none",
        outlineOffset: -2,
      }}
      onPointerDownCapture={() => setActiveZoneId(zoneID)}
    >
      {activeZoneId === zoneID ? (
        <ToolbarResourceSelected active />
      ) : (
        <ToolbarResourceNotSelected />
      )}
      <Group style={{ height: "100%", width: "100%" }}>
        {tileUi &&
          tileUi.flatMap((tile, index) => [
            index > 0 && (
              <Separator key={`sep-${tile.id}`} style={{ width: 4 }} />
            ),
            <Panel minSize={30} key={tile.id} id={tile.id}>
              {currentProjectRef.current && (
                <div style={{ height: "100%", width: "100%" }}>
                  <PanWorkspaceTile
                    product={product}
                    setModified={setModified}
                    metadata={metadata}
                    bcvRef={bcvRef}
                    debugRef={debugRef}
                    i18nRef={i18nRef}
                    currentProjectRef={currentProjectRef}
                    isEditor={layout.editor === zoneID}
                  />
                </div>
              )}
            </Panel>,
          ])}
      </Group>
    </div>
  );
}
