import { useState } from "react";
import { useTool } from "../../Context/ToolContext.jsx";
import ScrewContainer from "../../Tools/ScrewContainer.jsx";
import styles from "./Panel.module.css";

function Panel({
  children,
  isOpen = false,
  onOpen,
  mode = "click",
  requiresTool = false,
  requiredTool = "screwdriver",
  screwArray = [],
  clickThreshold = 5,
  looseAfter = false,
  className = "",
  size = "350px",
}) {

  const { currentTool } = useTool();
  const [clickCount, setClickCount] = useState(looseAfter ? 1 : 0);
  const [isDropping, setIsDropping] = useState(false);
  
  const tilt = Math.min(clickCount * 3, 15);  // deg rotation per click
  const FALL_DURATION = 1200;                 // ms

  const handleOpen = () => {
    if (isOpen || isDropping) return;

    setIsDropping(true);
    setTimeout(() => {
      onOpen?.();
    }, FALL_DURATION);
  };

  const handleClick = () => {
    if (mode !== "click") return;
    if (requiresTool && currentTool !== requiredTool)
      return;

    setClickCount(prev => {
      const next = prev + 1;

      if (next >= clickThreshold) {
        handleOpen();
      }

      return next;
    });
  };

  const panelContent = (
    <button
      onClick={handleClick}
      className={`
        ${styles.panel}
        ${isDropping ? styles.dropping : ""}
        ${className}
      `}
      style={{
        transform: !isDropping
          ? `rotate(${tilt}deg) translateY(${tilt * 2}px)`
          : undefined,
      }}
    >
      {children}
    </button>
  );

  return (
    <div
      className={styles.wrapper}
      style={{
        "--size": size,
        "--tilt": `${tilt}deg`,
        "--tiltHeight": `${tilt * 2}px`,
        "--animDuration": `${FALL_DURATION / 1000}s`,
      }}
    >
      {!isOpen && (mode === "screws" ? (
          <ScrewContainer
            enabled={!isOpen}
            requiredTool={requiredTool}
            screwArray={screwArray}
            onComplete={handleOpen}
          >
            {panelContent}
          </ScrewContainer>
        ) : (
          panelContent
        )
      )}
    </div>
  );
}

export default Panel;