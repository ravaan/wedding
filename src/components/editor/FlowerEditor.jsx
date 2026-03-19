import React, { useState, useRef, useCallback, useEffect } from "react";

const basePath = import.meta.env.BASE_URL || "/";

const FLOWER_OPTIONS = [
  "flower-coral.png",
  "flower-cream.png",
  "flower-orange.png",
  "flower-peach.png",
  "flower-pink.png",
  "flower-purple.png",
  "flower-red.png",
  "flower-yellow.png",
];

const FlowerEditor = ({
  flowers,
  landscapeFlowers,
  setLandscapeFlowers,
  portraitFlowers,
  setPortraitFlowers,
  orientation,
  editOrientation,
  setEditOrientation,
  simulateViewport,
  sectionRef,
  topClusterRef,
  bottomClusterRef,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [activeCluster, setActiveCluster] = useState("top");
  const [, forceUpdate] = useState(0);
  const [panelPos, setPanelPos] = useState({ x: null, y: null });
  const panelDragRef = useRef(null);

  // Select the right flowers/setter based on which orientation is being edited
  const editingFlowers =
    editOrientation === "portrait" ? portraitFlowers : landscapeFlowers;
  const setEditingFlowers =
    editOrientation === "portrait" ? setPortraitFlowers : setLandscapeFlowers;

  // When editing the active orientation, use live flowers; otherwise use the stored config
  const displayFlowers =
    editOrientation === orientation ? flowers : editingFlowers;

  const selected = displayFlowers.find((f) => f.id === selectedId);
  const clusterFlowers = displayFlowers.filter(
    (f) => f.cluster === activeCluster,
  );
  const clusterRef = activeCluster === "top" ? topClusterRef : bottomClusterRef;

  // Force re-render on scroll/resize so overlay positions stay in sync
  useEffect(() => {
    const refresh = () => forceUpdate((n) => n + 1);
    window.addEventListener("scroll", refresh);
    window.addEventListener("resize", refresh);
    return () => {
      window.removeEventListener("scroll", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  const updateFlower = useCallback(
    (id, updates) => {
      setEditingFlowers((prev) =>
        prev.map((f) => (f.id === id ? { ...f, ...updates } : f)),
      );
    },
    [setEditingFlowers],
  );

  const getClusterRect = useCallback(() => {
    if (!clusterRef?.current) return null;
    return clusterRef.current.getBoundingClientRect();
  }, [clusterRef]);

  const handleMouseDown = useCallback(
    (e, flower) => {
      e.stopPropagation();
      e.preventDefault();
      setSelectedId(flower.id);

      const rect = getClusterRect();
      if (!rect) return;

      const startX = e.clientX;
      const startY = e.clientY;
      const startFlowerX = flower.x;
      const startFlowerY = flower.y;

      const handleMouseMove = (moveEvent) => {
        const dx = ((moveEvent.clientX - startX) / rect.width) * 100;
        const dy = ((moveEvent.clientY - startY) / rect.height) * 100;
        updateFlower(flower.id, {
          x: Math.round((startFlowerX + dx) * 10) / 10,
          y: Math.round((startFlowerY + dy) * 10) / 10,
        });
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        setDragging(null);
      };

      setDragging(flower.id);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [updateFlower, getClusterRect],
  );

  const handleRotateStart = useCallback(
    (e, flower) => {
      e.stopPropagation();
      e.preventDefault();

      const rect = getClusterRect();
      if (!rect) return;

      const flowerCenterX = rect.left + (flower.x / 100) * rect.width;
      const flowerCenterY =
        activeCluster === "top"
          ? rect.top + (flower.y / 100) * rect.height
          : rect.bottom + (flower.y / 100) * rect.height;

      const handleMouseMove = (moveEvent) => {
        const angle = Math.atan2(
          moveEvent.clientY - flowerCenterY,
          moveEvent.clientX - flowerCenterX,
        );
        const degrees = Math.round((angle * 180) / Math.PI);
        updateFlower(flower.id, { rotation: degrees });
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [updateFlower, getClusterRect, activeCluster],
  );

  const addFlower = useCallback(() => {
    const prefix = activeCluster === "top" ? "t" : "b";
    const clusterNums = editingFlowers
      .filter((f) => f.cluster === activeCluster)
      .map((f) => parseInt(f.id.replace(prefix, ""), 10));
    const maxNum = Math.max(...clusterNums, 0);

    const newFlower = {
      id: `${prefix}${maxNum + 1}`,
      src: "flower-coral.png",
      x: 40,
      y: 0,
      width: 14,
      rotation: 0,
      scaleX: 1,
      opacity: 1,
      cluster: activeCluster,
    };

    setEditingFlowers((prev) => [...prev, newFlower]);
    setSelectedId(newFlower.id);
  }, [editingFlowers, activeCluster, setEditingFlowers]);

  const deleteFlower = useCallback(
    (id) => {
      setEditingFlowers((prev) => prev.filter((f) => f.id !== id));
      setSelectedId(null);
    },
    [setEditingFlowers],
  );

  const duplicateFlower = useCallback(
    (flower) => {
      const prefix = activeCluster === "top" ? "t" : "b";
      const allNums = editingFlowers
        .filter((f) => f.cluster === activeCluster)
        .map((f) => parseInt(f.id.replace(prefix, ""), 10));
      const maxNum = Math.max(...allNums, 0);

      const dup = {
        ...flower,
        id: `${prefix}${maxNum + 1}`,
        x: flower.x + 5,
        y: flower.y + 5,
      };

      setEditingFlowers((prev) => [...prev, dup]);
      setSelectedId(dup.id);
    },
    [editingFlowers, activeCluster, setEditingFlowers],
  );

  const handlePanelDragStart = useCallback(
    (e) => {
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const startPanelX = panelPos.x ?? window.innerWidth - 280;
      const startPanelY = panelPos.y ?? 80;

      const handleMove = (moveEvent) => {
        setPanelPos({
          x: startPanelX + (moveEvent.clientX - startX),
          y: startPanelY + (moveEvent.clientY - startY),
        });
      };

      const handleUp = () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp);
      };

      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
    },
    [panelPos],
  );

  const [saveStatus, setSaveStatus] = useState(null);

  const exportJSON = useCallback(() => {
    const json = JSON.stringify(
      {
        landscape: { flowers: landscapeFlowers },
        portrait: { flowers: portraitFlowers },
      },
      null,
      2,
    );
    navigator.clipboard.writeText(json).then(() => {
      alert("Flower layout JSON copied to clipboard!");
    });
    console.log("Flower Layout JSON:\n", json);
  }, [landscapeFlowers, portraitFlowers]);

  const saveFlowers = useCallback(async () => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/save-flowers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          landscape: { flowers: landscapeFlowers },
          portrait: { flowers: portraitFlowers },
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaveStatus("saved");
    } catch (err) {
      setSaveStatus("error");
      console.error("Failed to save flowers:", err);
    }
    setTimeout(() => setSaveStatus(null), 2000);
  }, [landscapeFlowers, portraitFlowers]);

  const copyFromOther = useCallback(() => {
    const source =
      editOrientation === "portrait" ? landscapeFlowers : portraitFlowers;
    const label = editOrientation === "portrait" ? "landscape" : "portrait";
    if (
      window.confirm(
        `Replace ${editOrientation} flowers with a copy from ${label}?`,
      )
    ) {
      setEditingFlowers(JSON.parse(JSON.stringify(source)));
      setSelectedId(null);
    }
  }, [editOrientation, landscapeFlowers, portraitFlowers, setEditingFlowers]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedId) return;
      const sel = displayFlowers.find((f) => f.id === selectedId);
      if (!sel) return;

      const step = e.shiftKey ? 5 : 1;
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          updateFlower(selectedId, { x: sel.x - step });
          break;
        case "ArrowRight":
          e.preventDefault();
          updateFlower(selectedId, { x: sel.x + step });
          break;
        case "ArrowUp":
          e.preventDefault();
          updateFlower(selectedId, { y: sel.y - step });
          break;
        case "ArrowDown":
          e.preventDefault();
          updateFlower(selectedId, { y: sel.y + step });
          break;
        case "Delete":
        case "Backspace":
          if (e.target.tagName !== "INPUT" && e.target.tagName !== "SELECT") {
            e.preventDefault();
            deleteFlower(selectedId);
          }
          break;
        case "Escape":
          setSelectedId(null);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, displayFlowers, updateFlower, deleteFlower]);

  // Compute flower overlay positions from cluster ref rect
  const rect = getClusterRect();
  const sectionRect = sectionRef?.current?.getBoundingClientRect();

  return (
    <div
      className="absolute inset-0 z-[200] pointer-events-auto"
      onClick={() => setSelectedId(null)}
      style={{ cursor: "crosshair" }}
    >
      {/* Flower overlays — positioned using fixed coords from cluster ref */}
      {rect &&
        sectionRect &&
        clusterFlowers.map((flower) => {
          const isSelected = flower.id === selectedId;

          // Calculate position relative to the section (since we're absolute inside it)
          const clusterTop = rect.top - sectionRect.top;
          const clusterLeft = rect.left - sectionRect.left;

          const flowerLeft = clusterLeft + (flower.x / 100) * rect.width;

          let posStyle;
          if (activeCluster === "top") {
            posStyle = {
              top: clusterTop + (flower.y / 100) * rect.height,
              left: flowerLeft,
            };
          } else {
            // Match CSS `bottom: ${-f.y}%` used by real flowers
            const sectionHeight = sectionRect.height;
            const clusterBottomFromSectionBottom =
              sectionHeight - (clusterTop + rect.height);
            const flowerBottom =
              clusterBottomFromSectionBottom + (-flower.y / 100) * rect.height;
            posStyle = { bottom: flowerBottom, left: flowerLeft };
          }

          return (
            <div
              key={flower.id}
              className="absolute"
              style={{
                ...posStyle,
                width: `${flower.width}${simulateViewport ? "%" : "vw"}`,
                transform: `rotate(${flower.rotation}deg) scaleX(${flower.scaleX})`,
                opacity: flower.opacity,
                cursor: dragging === flower.id ? "grabbing" : "grab",
                zIndex: isSelected ? 210 : 201,
              }}
              onMouseDown={(e) => handleMouseDown(e, flower)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(flower.id);
              }}
            >
              <img
                src={`${basePath}florals/${flower.src}`}
                alt={flower.id}
                className="w-full pointer-events-none select-none"
                draggable={false}
              />
              {isSelected && (
                <>
                  <div
                    className="absolute inset-0 border-2 border-dashed border-blue-500 rounded"
                    style={{ pointerEvents: "none" }}
                  />
                  <div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-pointer border-2 border-white shadow"
                    style={{ pointerEvents: "all" }}
                    onMouseDown={(e) => handleRotateStart(e, flower)}
                    title="Drag to rotate"
                  />
                  <div
                    className="absolute -bottom-5 left-0 text-[10px] font-mono bg-blue-500 text-white px-1 rounded"
                    style={{ pointerEvents: "none" }}
                  >
                    {flower.id}
                  </div>
                </>
              )}
            </div>
          );
        })}

      {/* Control Panel */}
      <div
        className="fixed w-64 bg-white/95 backdrop-blur border border-gray-300 rounded-lg shadow-xl p-4 z-[300] text-xs"
        onClick={(e) => e.stopPropagation()}
        style={{
          left: panelPos.x != null ? panelPos.x : undefined,
          top: panelPos.y != null ? panelPos.y : undefined,
          right: panelPos.x == null ? 16 : undefined,
          ...(panelPos.x == null ? { top: 80 } : {}),
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
        }}
      >
        {/* Drag handle */}
        <div
          className="flex items-center justify-center mb-2 py-1 -mx-4 -mt-4 px-4 pt-3 rounded-t-lg cursor-move bg-gray-200/60 hover:bg-gray-300/60 select-none"
          onMouseDown={handlePanelDragStart}
        >
          <div className="w-8 h-1 bg-gray-400 rounded-full" />
        </div>

        {/* Orientation toggle */}
        <div className="flex mb-2 border border-gray-300 rounded overflow-hidden">
          <button
            onClick={() => {
              setEditOrientation("portrait");
              setSelectedId(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold ${
              editOrientation === "portrait"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Portrait
          </button>
          <button
            onClick={() => {
              setEditOrientation("landscape");
              setSelectedId(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold ${
              editOrientation === "landscape"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Landscape
          </button>
        </div>
        {editOrientation !== orientation && (
          <p className="text-[10px] text-amber-600 mb-2 font-medium">
            Editing {editOrientation} (current view: {orientation})
          </p>
        )}

        {/* Cluster toggle */}
        <div className="flex mb-3 border border-gray-300 rounded overflow-hidden">
          <button
            onClick={() => {
              setActiveCluster("top");
              setSelectedId(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold ${
              activeCluster === "top"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Top
          </button>
          <button
            onClick={() => {
              setActiveCluster("bottom");
              setSelectedId(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold ${
              activeCluster === "bottom"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Bottom
          </button>
        </div>

        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-sm text-gray-800">Flower Editor</h3>
          <div className="flex gap-1">
            <button
              onClick={saveFlowers}
              disabled={saveStatus === "saving"}
              className={`px-2 py-1 rounded text-[10px] font-bold ${
                saveStatus === "saved"
                  ? "bg-green-600 text-white"
                  : saveStatus === "error"
                    ? "bg-red-600 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {saveStatus === "saving"
                ? "..."
                : saveStatus === "saved"
                  ? "Saved!"
                  : saveStatus === "error"
                    ? "Error"
                    : "Save"}
            </button>
            <button
              onClick={exportJSON}
              className="px-2 py-1 bg-green-600 text-white rounded text-[10px] font-bold hover:bg-green-700"
            >
              Export
            </button>
          </div>
        </div>
        <button
          onClick={copyFromOther}
          className="w-full mb-3 px-3 py-1 bg-amber-100 text-amber-800 rounded text-[10px] font-bold hover:bg-amber-200 border border-amber-300"
        >
          Copy from {editOrientation === "portrait" ? "Landscape" : "Portrait"}
        </button>

        <button
          onClick={addFlower}
          className="w-full mb-3 px-3 py-1.5 bg-blue-600 text-white rounded font-bold hover:bg-blue-700"
        >
          + Add Flower
        </button>

        {/* Selected flower controls */}
        {selected && selected.cluster === activeCluster && (
          <div className="space-y-2 border-t border-gray-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-700">
                Selected: {selected.id}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => duplicateFlower(selected)}
                  className="px-2 py-0.5 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Copy
                </button>
                <button
                  onClick={() => deleteFlower(selected.id)}
                  className="px-2 py-0.5 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Del
                </button>
              </div>
            </div>

            <label className="block">
              <span className="text-gray-600">Image</span>
              <select
                value={selected.src}
                onChange={(e) =>
                  updateFlower(selected.id, { src: e.target.value })
                }
                className="mt-0.5 w-full border rounded px-2 py-1 text-xs"
              >
                {FLOWER_OPTIONS.map((src) => (
                  <option key={src} value={src}>
                    {src.replace("flower-", "").replace(".png", "")}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-gray-600">X: {selected.x.toFixed(1)}%</span>
              <input
                type="range"
                min="-20"
                max="100"
                step="0.5"
                value={selected.x}
                onChange={(e) =>
                  updateFlower(selected.id, { x: parseFloat(e.target.value) })
                }
                className="w-full"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">Y: {selected.y.toFixed(1)}%</span>
              <input
                type="range"
                min="-20"
                max="30"
                step="0.5"
                value={selected.y}
                onChange={(e) =>
                  updateFlower(selected.id, { y: parseFloat(e.target.value) })
                }
                className="w-full"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">Width: {selected.width}vw</span>
              <input
                type="range"
                min="3"
                max="50"
                step="0.5"
                value={selected.width}
                onChange={(e) =>
                  updateFlower(selected.id, {
                    width: parseFloat(e.target.value),
                  })
                }
                className="w-full"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">
                Rotation: {selected.rotation}deg
              </span>
              <input
                type="range"
                min="-180"
                max="180"
                step="1"
                value={selected.rotation}
                onChange={(e) =>
                  updateFlower(selected.id, {
                    rotation: parseInt(e.target.value),
                  })
                }
                className="w-full"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">
                Opacity: {selected.opacity.toFixed(2)}
              </span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={selected.opacity}
                onChange={(e) =>
                  updateFlower(selected.id, {
                    opacity: parseFloat(e.target.value),
                  })
                }
                className="w-full"
              />
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.scaleX === -1}
                onChange={(e) =>
                  updateFlower(selected.id, {
                    scaleX: e.target.checked ? -1 : 1,
                  })
                }
              />
              <span className="text-gray-600">Flip horizontal</span>
            </label>
          </div>
        )}

        {/* Flower list */}
        <div className="mt-3 border-t border-gray-200 pt-2">
          <p className="font-bold text-gray-600 mb-1">
            All ({clusterFlowers.length})
          </p>
          <div className="space-y-0.5 max-h-40 overflow-y-auto">
            {clusterFlowers.map((f) => (
              <div
                key={f.id}
                className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-gray-100 ${
                  f.id === selectedId ? "bg-blue-100" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(f.id);
                }}
              >
                <img
                  src={`${basePath}florals/${f.src}`}
                  className="w-6 h-6 object-contain"
                  alt=""
                />
                <span className="font-mono text-gray-700">{f.id}</span>
                <span className="text-gray-400 ml-auto">
                  {f.src.replace("flower-", "").replace(".png", "")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 border-t border-gray-200 pt-2 text-[10px] text-gray-400">
          <p>Drag flowers to move. Click to select.</p>
          <p>Arrow keys to nudge (Shift = 5x).</p>
          <p>Delete/Backspace to remove selected.</p>
          <p>Ctrl+Shift+E to toggle editor.</p>
        </div>
      </div>
    </div>
  );
};

export default FlowerEditor;
