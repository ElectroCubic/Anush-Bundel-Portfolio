import { useState, useRef, useEffect } from "react";
import { useTool } from "../Context/ToolContext";
import Screw from "./Screw";

function ScrewContainer({ children, screwArray, onComplete }) {
  const { currentTool, dropEvent, setDropEvent, getToolTip, isNear } = useTool();

  const [screws, setScrews] = useState(screwArray); // [{id, x, y}...]

  const ref = useRef();

  const removeScrew = (id) => {
    setScrews((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      if (updated.length === 0) onComplete?.();
      return updated;
    });
  };

    useEffect(() => {
        if (!dropEvent) return;

        if (dropEvent.tool !== "screwdriver") return;

        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const tip = getToolTip();

        const target = screws.find((s) => {
            const world = {
                x: rect.left + s.x,
                y: rect.top + s.y,
            };
            return isNear(tip, world);
        });

        if (target) {
            removeScrew(target.id);
        }

        setDropEvent(null); // Reset drop point

    }, [dropEvent]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {children}

      {screws.map((s) => {
        const rect = ref.current?.getBoundingClientRect();

        const world = rect
          ? { x: rect.left + s.x, y: rect.top + s.y }
          : { x: 0, y: 0 };

        const active =
          currentTool === "screwdriver" &&
          isNear(getToolTip(), world);

        return (
          <Screw key={s.id} x={s.x} y={s.y} isActive={active} />
        );
      })}
    </div>
  );
}

export default ScrewContainer;