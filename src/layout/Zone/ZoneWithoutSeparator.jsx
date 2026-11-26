import PanWorkspaceZone from "./PanWorkspaceZone";
import { Panel } from "react-resizable-panels";

export default function ZoneWithoutSeparator({
  zone,
  zoneID,
  removeZone,
  updateZone,
  summaries,
  layout,
  modified,
  setModified,
  activeZoneId,
  setActiveZoneId,
}) {
  return (
    <Panel
      key={zoneID}
      id={String(zoneID)}
      minSize={10}
      style={{ padding: "0 4px 4px" }}
    >
      <PanWorkspaceZone
        zone={zone}
        summaries={summaries}
        zoneID={zoneID}
        onRemoveZone={removeZone}
        onUpdateZone={updateZone}
        layout={layout}
        setModified={setModified}
        modified={modified}
        activeZoneId={activeZoneId}
        setActiveZoneId={setActiveZoneId}
      />
    </Panel>
  );
}
