import { useState, useRef, useEffect } from "react";
import { useTool } from "../Context/ToolContext.jsx";
import Screw from "./Screw.jsx";

function ScrewContainer({
  children,
  screwArray,
  onComplete,
  enabled = true,
  fullSize = false,
}) {
  const { currentTool, dropEvent, setDropEvent, getToolTip, isNear } = useTool();

  const [screws, setScrews] = useState(screwArray);   // [{id, x, y}...]
  const [removingIds, setRemovingIds] = useState([]);

  const ref = useRef();

  const UNSCREW_ANIM_DURATION = 450; // ms

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
    }, UNSCREW_ANIM_DURATION); 
  };

  useEffect(() => {
      if (!dropEvent) return;

      if (!enabled) return;

      if (dropEvent.tool !== "screwdriver") return;

      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const tip = getToolTip();

      const target = screws.find((s) => {
          const world = {
            x: rect.left + s.x * rect.width,
            y: rect.top + s.y * rect.height,
          };
          return isNear(tip, world);
      });

      if (target) {
          removeScrew(target.id);
      }

      setDropEvent(null); // Reset drop point

  }, [dropEvent]);

  const containerStyle = fullSize ? 
  {position: "relative",
   width: "100%", 
   height: "100%",
   "--animDuration": `${UNSCREW_ANIM_DURATION / 1000}s`} : 
   
   {position: "absolute",
    inset: 0,
    "--animDuration": `${UNSCREW_ANIM_DURATION / 1000}s`}

  return (
    <div 
      ref={ref}
      style={containerStyle}
    >
      {children}

      {screws.map((s) => {
        const rect = ref.current?.getBoundingClientRect();

        const world = rect
          ? { x: rect.left + s.x * rect.width, y: rect.top + s.y * rect.height}
          : { x: 0, y: 0 };

        const active =
          enabled &&
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