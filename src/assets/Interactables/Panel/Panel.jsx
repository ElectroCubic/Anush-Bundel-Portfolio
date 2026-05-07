import { useState } from "react";
import { useTool } from "../../Context/ToolContext.jsx";
import ScrewContainer from "../../Tools/ScrewContainer.jsx";
import styles from "./Panel.module.css";

function Panel({
  children,
  cover,
  isOpen = false,
  onOpen,
  mode = "click",
  requiresTool = false,
  requiredTool = "screwdriver",
  screwArray = [],
  clickThreshold = 5,
  looseAfter = false,
  className = "",
  animationClass = "",
}) {

  const { currentTool } = useTool();

  const [clickCount, setClickCount] = useState(
    looseAfter ? 1 : 0
  );

  const [isAnimating, setIsAnimating] = useState(false);
  const FALL_DURATION = 1200;
  const tilt = Math.min(clickCount * 3, 15);

  const handleOpen = () => {
    if (isOpen || isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      onOpen?.();
    }, FALL_DURATION);
  };

  const handleClick = () => {

    if (mode !== "click") return;

    if (
      requiresTool &&
      currentTool !== requiredTool
    ) {
      return;
    }

    setClickCount(prev => {

      const next = prev + 1;

      if (next >= clickThreshold) {
        handleOpen();
      }

      return next;
    });
  };

  const coverPanel = (
    <button
      onClick={handleClick}
      className={`
        ${styles.panel}
        ${isAnimating ? animationClass : ""}
        ${className}
      `}
      style={{
        transform: !isAnimating
          ? `rotate(${tilt}deg) translateY(${tilt * 2}px)`
          : undefined,
      }}
    >
      {cover}
    </button>
  );

  return (
    <div
      className={styles.wrapper}
      style={{
        "--tilt": `${tilt}deg`,
        "--tiltHeight": `${tilt * 2}px`,
        "--animDuration": `${FALL_DURATION / 1000}s`,
      }}
    >

      {/* HIDDEN CONTENT */}
      <div
        className={styles.contentLayer}
        style={{
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {children}
      </div>

      {/* COVER */}
      {!isOpen && (
        mode === "screws"
          ? (
            <ScrewContainer
              enabled={!isOpen}
              screwArray={screwArray}
              onComplete={handleOpen}
            >
              {coverPanel}
            </ScrewContainer>
          )
          : coverPanel
      )}

    </div>
  );
}

export default Panel;