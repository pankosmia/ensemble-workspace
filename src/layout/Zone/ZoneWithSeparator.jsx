import { Separator } from "react-resizable-panels";
import { Panel } from "react-resizable-panels";
import PanWorkspaceZone from "./PanWorkspaceZone";

export default function ZoneWithSeparator({
  zone,
  zoneID,
  layout,
  orientation,
  removeZone,
  updateZone,
  summaries,
  setModified,
  modified,
  activeZoneId,
  setActiveZoneId,
}) {
  return (
    <>
      {orientation === "vertical" ? (
        <Separator
          key={`sep-${zoneID}`}
          style={{ height: 4, background: "green" }}
        />
      ) : (
        <Separator
          key={`sep-${zoneID}`}
          style={{ width: 4, background: "green" }}
        />
      )}

      <Panel key={zoneID} id={String(zoneID)} minSize={10}>
        <PanWorkspaceZone
          zone={zone}
          zoneID={zoneID}
          summaries={summaries}
          onRemoveZone={removeZone}
          onUpdateZone={updateZone}
          layout={layout}
          setModified={setModified}
          modified={modified}
          activeZoneId={activeZoneId}
          setActiveZoneId={setActiveZoneId}
        />
      </Panel>
    </>
  );
}
