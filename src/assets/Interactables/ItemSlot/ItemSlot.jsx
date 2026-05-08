import { useEffect, useRef } from "react";
import { useTool } from "../../Context/ToolContext.jsx";

function ItemSlot({
  children,
  itemType,
  enabled = true,
  onInsert,
  inserted = false,
}) {

  const { dropEvent, setDropEvent, isNear } = useTool();
  const ref = useRef();

  useEffect(() => {

    if (!dropEvent) return;

    if (!enabled) return;

    if (inserted) return;

    // Wrong item
    if (dropEvent.tool !== itemType) return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const slotCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const droppedPos = dropEvent.pos;

    if (isNear(droppedPos, slotCenter)) {

      onInsert?.({
        x: slotCenter.x,
        y: slotCenter.y,
      });
    }

    setDropEvent(null);

  }, [dropEvent]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

export default ItemSlot;