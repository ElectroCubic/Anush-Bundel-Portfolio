import { useEffect, useRef, cloneElement } from "react";
import { useTool } from "../../Context/ToolContext.jsx";

function ItemSlot({
  children,
  itemType,
  inserted = false,
  canInsert = true,
  canRemove = true,
  onInsert,
  onRemove,
}) {

  const { dropEvent, setDropEvent, isNear } = useTool();
  const slotRef = useRef();

  // INSERT LOGIC

  useEffect(() => {

    if (!dropEvent) return;

    if (inserted) return;

    if (!canInsert) return;

    if (dropEvent.tool !== itemType) return;

    const rect = slotRef.current?.getBoundingClientRect();
    if (!rect) return;

    const slotCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const success = isNear(dropEvent.pos, slotCenter, dropEvent.radius);

    if (success) {
      onInsert?.(slotCenter);
    }

    setDropEvent(null);   // Resets the drop point

  }, [dropEvent]);

  // REMOVE LOGIC

  const handleRemove = () => {

    if (!inserted) return;

    if (!canRemove) return;

    const rect = slotRef.current?.getBoundingClientRect();
    if (!rect) return;

    const slotCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    onRemove?.(slotCenter);
  };

  return cloneElement(children, {
    ref: slotRef,
    onClick: inserted ? handleRemove : undefined,
  });
}

export default ItemSlot;