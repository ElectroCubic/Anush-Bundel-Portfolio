import { createContext, useContext, useState } from "react";

const ToolContext = createContext();

export function ToolProvider({ children }) {
  const [toolPos, setToolPos] = useState({ x: 0, y: 0 });
  const [currentTool, setCurrentTool] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dropEvent, setDropEvent] = useState(null);

  const CONFIG = {
    tipOffset: { x: 58, y: 6 },
  };

  const getToolTip = () => ({
    x: toolPos.x + CONFIG.tipOffset.x,
    y: toolPos.y + CONFIG.tipOffset.y,
  });

  const isNear = (a, b, radius) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.sqrt(dx * dx + dy * dy) < radius;
  };

  const beginDragTool = (tool, pos) => {
    setToolPos(pos);
    setCurrentTool(tool);
  };

  return (
    <ToolContext.Provider
        value={{
            toolPos,
            setToolPos,
            currentTool,
            setCurrentTool,
            dropEvent,
            setDropEvent,
            getToolTip,
            isNear,
            beginDragTool,
        }}
    >
      {children}
    </ToolContext.Provider>
  );
}

export function useTool() {
  return useContext(ToolContext);
}