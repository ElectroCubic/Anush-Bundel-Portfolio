import { createContext, useContext, useState } from "react";

const ToolContext = createContext();

export function ToolProvider({ children }) {
  const [toolPos, setToolPos] = useState({ x: 0, y: 0 });
  const [currentTool, setCurrentTool] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dropEvent, setDropEvent] = useState(null);

  const CONFIG = {
    tipOffset: { x: 58, y: 6 },
    screwRadius: 25,
  };

  const getToolTip = () => ({
    x: toolPos.x + CONFIG.tipOffset.x,
    y: toolPos.y + CONFIG.tipOffset.y,
  });

  const isNear = (a, b) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy) < CONFIG.screwRadius;
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
        }}
    >
      {children}
    </ToolContext.Provider>
  );
}

export function useTool() {
  return useContext(ToolContext);
}