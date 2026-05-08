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
  animationClass = "",
  persistent = false,
  animationDuration = 1000,
}) {

  const { currentTool } = useTool();

  const [clickCount, setClickCount] = useState(
    looseAfter ? 1 : 0
  );

  const [isAnimating, setIsAnimating] = useState(false);
  const tilt = Math.min(clickCount * 3, 15);

  const handleOpen = () => {
    if (isOpen || isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      if (persistent) {
        onOpen?.(true);
      } else {
        onOpen?.();
      }
    }, animationDuration);
  };

  const handleClick = () => {

    if (persistent) {
      onOpen?.(!isOpen);
      return;
    }

    if (mode !== "click") return;

    if (requiresTool && currentTool !== requiredTool) {
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


  const animStyle =
    mode === "click"
      ? {
          transformOrigin: "top center",
          transition: "transform 0.25s ease",

          transform: !isAnimating
            ? `rotate(${tilt}deg) translateY(${tilt * 2}px)`
            : undefined,
        }

      : {
          transition: `
            transform
            var(--animDuration)
            cubic-bezier(0.2, 0.7, 0.2, 1)
          `,
        };

  const coverPanel = (
    <div
      onClick={handleClick}
      className={`
        ${styles.panel}

        ${
          persistent ? 
            (isOpen ? animationClass : "") : 
            (isAnimating ? animationClass : "")
        }
      `}
      style={animStyle}
    >
      {cover}
    </div>
  );

  return (
    <div
      className={styles.wrapper}
      style={{
        "--tilt": `${tilt}deg`,
        "--tiltHeight": `${tilt * 2}px`,
        "--animDuration": `${animationDuration / 1000}s`,
      }}
    >

      <div 
        className={styles.sizeLayer} 
        style={{
          display: isOpen && !persistent ? "block" : "none",
        }}>

        {cover}
      </div>

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
      {(!isOpen || persistent) && (mode === "screws"
          ? (
            <ScrewContainer
              fullSize={true}
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