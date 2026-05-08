import { useEffect, useRef, cloneElement } from "react";
import { useTool } from "../../Context/ToolContext.jsx";

function ItemSlot({
  children,
  itemType,
  enabled = true,
  inserted = false,
  onInsert,
}) {

  const {
    dropEvent,
    setDropEvent,
    isNear,
  } = useTool();

  const slotRef = useRef();

  useEffect(() => {

    if (!dropEvent) return;

    if (!enabled) return;

    if (inserted) return;

    if (dropEvent.tool !== itemType) return;

    const rect = slotRef.current?.getBoundingClientRect();
    if (!rect) return;

    const slotCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    if (
      isNear(
        dropEvent.pos,
        slotCenter,
        dropEvent.radius
      )
    ) {

      onInsert?.(slotCenter);
    }

    setDropEvent(null);

  }, [dropEvent]);

  return cloneElement(children, {
    ref: slotRef,
  });
}

export default ItemSlot;