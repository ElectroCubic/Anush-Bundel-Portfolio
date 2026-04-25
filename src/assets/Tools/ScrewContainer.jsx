import { useState, useRef, useEffect } from "react";
import { useTool } from "../Context/ToolContext.jsx";
import Screw from "./Screw.jsx";

function ScrewContainer({ children, screwArray, onComplete }) {
  const { currentTool, dropEvent, setDropEvent, getToolTip, isNear } = useTool();

  const [screws, setScrews] = useState(screwArray);   // [{id, x, y}...]
  const [removingIds, setRemovingIds] = useState([]);

  const ref = useRef();

  const removeScrew = (id) => {
    setRemovingIds((prev) => [...prev, id]);

    setTimeout(() => {
      setScrews((prev) => {
        const updated = prev.filter((s) => s.id !== id);

        if (updated.length === 0) {
          setTimeout(() => {
            onComplete?.();
          }, 0);
        }

        return updated;
      });

      setRemovingIds((prev) => prev.filter((i) => i !== id));
    }, 450); // CSS 
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
          <Screw 
            key={s.id} 
            x={s.x} 
            y={s.y} 
            isActive={active}
            isRemoving={removingIds.includes(s.id)} 
          />
        );
      })}
    </div>
  );
}

export default ScrewContainer;