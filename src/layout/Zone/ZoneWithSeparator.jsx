import { Separator } from "react-resizable-panels";
import { Panel } from "react-resizable-panels";
import PanWorkspaceZone from "./PanWorkspaceZone";
import { useTheme } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
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
  const theme = useTheme();
  return (
    <>
      {orientation === "vertical" ? (
        <Separator
          key={`sep-${zoneID}`}
          className="workspace-separator"
          style={{ background: theme.palette.primary.light }}
        >
          <MoreHorizOutlinedIcon
            fontSize="small"
            sx={{ color: theme.palette.primary.contrastText }}
          />
        </Separator>
      ) : (
        <Separator key={`sep-${zoneID}`} className="workspace-separator">
          <MoreHorizOutlinedIcon
            fontSize="small"
            sx={{ color: theme.palette.primary.contrastText }}
          />
        </Separator>
      )}

      <Panel
        key={zoneID}
        id={String(zoneID)}
        minSize={10}
        style={{ padding: "4px" }}
      >
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
