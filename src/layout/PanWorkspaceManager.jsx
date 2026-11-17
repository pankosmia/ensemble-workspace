import { useState, useEffect } from "react";
import PanWorkspaceZone from "./Zone/PanWorkspaceZone";
import { Group, Panel } from "react-resizable-panels";
import { Separator } from "react-resizable-panels";
import { getJson } from "pankosmia-lib/http";
import ZoneWithoutSeparator from "./Zone/ZoneWithoutSeparator";
import ZoneWithSeparator from "./Zone/ZoneWithSeparator";
import config from "./jsonV1.json";

const reverseOrientation = (current) => {
  if (current === "horizontal") {
    return "vertical";
  }
  return "horizontal";
};
export default function PanWorkspaceManager({ setModified, modified }) {
  const [zones, setZones] = useState(config.zones);
  const [layoutOrder, setLayoutOrder] = useState(config.layout.order);
  const [layoutZoneId, setLayoutZoneId] = useState(config.layout.zoneId);
  const [initLayout, setInitLayout] = useState(config.layout.init);
  const [modulo, setModulo] = useState(initLayout === "vertical" ? 1 : 0);

  const [metadataSummaries, setMetadataSummaries] = useState(null);

  // const addZone = () => {
  //   if (zones.length >= 4) return;
  //   const usedIds = zones.map((zone) => zone.id);
  //   let nextId = 1;
  //   while (usedIds.includes(nextId)) {
  //     nextId++;
  //   }
  //   setZones([
  //     ...zones,
  //     {
  //       id: nextId,
  //       displayMode: "",
  //       tiles: [],
  //     },
  //   ]);
  // };
  const removeZone = (id) => {
    const newZones = zones.filter((zone) => {
      if (zone.id === id) {
        return false;
      }
      return true;
    });

    setZones(newZones);
  };
  const updateZone = (id, newZoneData) => {
    const newZones = zones.map((zone) => {
      if (zone.id === id) {
        return {
          ...zone,
          ...newZoneData,
        };
      }
      return zone;
    });
    setZones(newZones);
  };
  const rotateRight = () => {
    if (!modulo % 2 === 0) {
      setLayoutZoneId((prev) => {
        let prev2 = [...prev];
        prev2 = prev2.reverse();
        return prev2;
      });
      setLayoutOrder((prev) => {
        let prev2 = [...prev];
        prev2 = prev2.reverse();
        return prev2;
      });
    } else {
      setLayoutZoneId((prev) => {
        let prev2 = [...prev];
        prev2 = prev2.map((e) => [...e.reverse()]);
        return prev2;
      });
    }
    setLayoutOrder((prev) => prev.map((e) => reverseOrientation(e)));
    setInitLayout((prev) => reverseOrientation(prev));
    setModulo((prev) => (prev + 1) % 2);
  };
  const rotaterLeft = () => {
    if (modulo % 2 === 0) {
      setLayoutZoneId((prev) => {
        let prev2 = [...prev];
        prev2 = prev2.reverse();
        return prev2;
      });
      setLayoutOrder((prev) => {
        let prev2 = [...prev];
        prev2 = prev2.reverse();
        return prev2;
      });
    } else {
      setLayoutZoneId((prev) => {
        let prev2 = [...prev];
        prev2 = prev2.map((e) => [...e.reverse()]);
        return prev2;
      });
    }
    setLayoutOrder((prev) => prev.map((e) => reverseOrientation(e)));
    setInitLayout((prev) => reverseOrientation(prev));
    setModulo((prev) => (prev + 1) % 2);
  };
  const flipV = () => {
    if (initLayout === "horizontal") {
      setLayoutZoneId((prev) => {
        let prev2 = [...prev];
        prev2 = prev2.reverse();
        prev2 = prev2.map((e, id) => {
          if (layoutOrder[id] === "horizontal") {
            return [...e.reverse()];
          } else {
            return e;
          }
        });
        return prev2;
      });
      setLayoutOrder((prev) => {
        let prev2 = [...prev];
        prev2 = prev2.reverse();
        return prev2;
      });
    } else {
      setLayoutZoneId((prev) => {
        let prev2 = [...prev];
        prev2 = prev2.map((e, id) => {
          if (layoutOrder[id] === "horizontal") {
            return [...e.reverse()];
          } else {
            return e;
          }
        });
        return prev2;
      });
    }
  };
  const flipH = () => {
    if (initLayout === "vertical") {
      setLayoutZoneId((prev) => {
        let prev2 = [...prev];
        prev2 = prev2.reverse();
        prev2 = prev2.map((e, id) => {
          if (layoutOrder[id] === "vertical") {
            return [...e.reverse()];
          } else {
            return e;
          }
        });
        return prev2;
      });
      setLayoutOrder((prev) => {
        let prev2 = [...prev];
        prev2 = prev2.reverse();
        return prev2;
      });
    } else {
      setLayoutZoneId((prev) => {
        let prev2 = [...prev];
        prev2 = prev2.map((e, id) => {
          if (layoutOrder[id] === "vertical") {
            return [...e.reverse()];
          } else {
            return e;
          }
        });
        return prev2;
      });
    }
  };

  useEffect(() => {
    async function getSummaries() {
      const fullMetadataResponse = await getJson(
        `/api/burrito/metadata/summaries`,
      );
      console.log(fullMetadataResponse);
      if (fullMetadataResponse.ok) {
        setMetadataSummaries(fullMetadataResponse.json);
      } else {
        throw new Error("test");
      }
    }
    getSummaries();
  }, []);
  return (
    metadataSummaries && (
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* <div>
        <button style={{ margin: "8px" }} onClick={addZone}>
          + Zone
        </button>
        <button onClick={() => rotaterLeft()}>{`<-- rotation`}</button>
        <button onClick={() => rotateRight()}>{`rotation -->`}</button>\
        <button onClick={() => flipH()}>{`flip horizontal`}</button>
        <button onClick={() => flipV()}>{`flip vertical`}</button>
      </div> */}

        <Group style={{ height: "100%" }} orientation={initLayout}>
          {layoutZoneId.map((arrayIds, idArr) => {
            if (arrayIds.length > 1) {
              let posibleSeparator;
              if (idArr > 0) {
                posibleSeparator =
                  initLayout === "vertical" ? (
                    <Separator
                      key={`sep-${idArr}`}
                      style={{ height: 4, background: "green" }}
                    />
                  ) : (
                    <Separator
                      key={`sep-${idArr}`}
                      style={{ width: 4, background: "green" }}
                    />
                  );
              }
              return (
                <>
                  {posibleSeparator}
                  <Panel key={idArr} id={`inside-${String(idArr)}`}>
                    <Group
                      style={{ height: "100%" }}
                      orientation={layoutOrder[idArr]}
                    >
                      {arrayIds.map((idZ, id2) => {
                        if (id2 > 0) {
                          return (
                            <ZoneWithSeparator
                              summaries={metadataSummaries}
                              zone={zones[idZ]}
                              zoneID={zones[idZ].id}
                              layout={config.layout}
                              orientation={layoutOrder[idArr]}
                              removeZone={layoutOrder[idArr]}
                              updateZone={updateZone}
                              setModified={setModified}
                              modified={modified}
                            />
                          );
                        } else {
                          return (
                            <ZoneWithoutSeparator
                              summaries={metadataSummaries}
                              zone={zones[idZ]}
                              zoneID={zones[idZ].id}
                              layout={config.layout}
                              removeZone={layoutOrder[idArr]}
                              updateZone={updateZone}
                              setModified={setModified}
                              modified={modified}
                            />
                          );
                        }
                      })}
                    </Group>
                  </Panel>
                </>
              );
            } else {
              if (idArr > 0) {
                return (
                  <ZoneWithSeparator
                    summaries={metadataSummaries}
                    zone={zones[arrayIds[0]]}
                    zoneID={zones[arrayIds[0]].id}
                    orientation={initLayout}
                    layout={config.layout}
                    removeZone={removeZone}
                    updateZone={updateZone}
                    setModified={setModified}
                    modified={modified}
                  />
                );
              } else {
                return (
                  <ZoneWithoutSeparator
                    summaries={metadataSummaries}
                    zone={zones[arrayIds[0]]}
                    layout={config.layout}
                    zoneID={zones[arrayIds[0]].id}
                    removeZone={removeZone}
                    updateZone={updateZone}
                    setModified={setModified}
                    modified={modified}
                  />
                );
              }
            }
          })}
        </Group>
      </div>
    )
  );
}
