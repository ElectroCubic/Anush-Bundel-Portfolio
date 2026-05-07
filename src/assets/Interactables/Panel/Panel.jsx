import { useState } from "react";
import { useTool } from "../../Context/ToolContext.jsx";
import styles from "./Panel.module.css";

function Panel({
  children,
  isOpen = false,
  onOpen,
  requiresTool = false,
  requiredTool = "screwdriver",
  coverImage,
  className = "",
  looseAfter = false,
  clickThreshold = 5,
  size = "350px",
}) {

  const { currentTool } = useTool();
  const [clickCount, setClickCount] = useState(looseAfter ? 1 : 0);
  const [isDropping, setIsDropping] = useState(false);

  const FALL_DURATION = 1200;  // ms

  const handleClick = () => {
    if (isOpen || isDropping) return;

    // requires screwdriver
    if (requiresTool && currentTool !== requiredTool) {
      return;
    }

    setClickCount((prev) => {
      const next = prev + 1;

      if (next >= clickThreshold) {
        setIsDropping(true);

        setTimeout(() => {
          onOpen?.();
        }, FALL_DURATION);
      }

      return next;
    });
  };

  const tilt = Math.min(clickCount * 3, 15);

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

      <div className={styles.contentLayer}>
        {children}
      </div>

      {!isOpen && (
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
          <img
            src={coverImage}
            className={styles.cover}
            draggable="false"
          />
        </button>
      )}
    </div>
  );
}

export default Panel;