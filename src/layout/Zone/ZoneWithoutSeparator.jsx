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
}) {
  return (
    <Panel key={zoneID} id={String(zoneID)} minSize={10}>
      <PanWorkspaceZone
        zone={zone}
        summaries={summaries}
        zoneID={zoneID}
        onRemoveZone={removeZone}
        onUpdateZone={updateZone}
        layout={layout}
        setModified={setModified}
        modified={modified}
      />
    </Panel>
  );
}
