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
import MenuZone from "./MenuZone";
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
  const [tileUi, setTileUi] = useState(null);
  const [activeTileId, setActiveTileId] = useState(zone.tiles[0].id);

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
        overflow: "hidden",
        outlineOffset: -2,
        position: "relative",
      }}
      onPointerDownCapture={() => setActiveZoneId(zoneID)}
    >
      <Group style={{ height: "100%", width: "100%" }}>
        {tileUi &&
          tileUi.flatMap((tile, index) => [
            index > 0 && (
              <Separator key={`sep-${tile.id}`} className="tiles-separator" />
            ),
            <Panel
              minSize={30}
              key={tile.id}
              id={tile.id}
              style={{
                background: "white",
                borderStartStartRadius: index === 0 ? 4 : 0,
                borderEndStartRadius: index === 0 ? 4 : 0,
                borderStartEndRadius: index === tileUi.length - 1 ? 4 : 0,
                borderEndEndRadius: index === tileUi.length - 1 ? 4 : 0,
              }}
            >
              {currentProjectRef.current && (
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onPointerDownCapture={() => setActiveTileId(tile.id)}
                >
                  {activeZoneId === zoneID && activeTileId === tile.id ? (
                    <ToolbarResourceSelected
                      active
                      metadata={{
                        ...summaries[tile.src],
                        local_path: tile.src,
                      }}
                    />
                  ) : (
                    <ToolbarResourceNotSelected
                      metadata={{
                        ...summaries[tile.src],
                        local_path: tile.src,
                      }}
                    />
                  )}
                  <div
                    style={{
                      flex: 1,
                      minHeight: 0,
                      overflowY: "auto",
                      marginBottom: index === tileUi.length - 1 ? 34 : 0,
                    }}
                  >
                    <PanWorkspaceTile
                      product={product}
                      setModified={setModified}
                      metadata={{
                        ...summaries[tile.src],
                        local_path: tile.src,
                      }}
                      bcvRef={bcvRef}
                      debugRef={debugRef}
                      i18nRef={i18nRef}
                      currentProjectRef={currentProjectRef}
                      isEditor={layout.editor === zoneID}
                    />
                  </div>
                </div>
              )}
            </Panel>,
          ])}
      </Group>
      {currentProjectRef.current && <MenuZone tiles={tileUi} />}
    </div>
  );
}
