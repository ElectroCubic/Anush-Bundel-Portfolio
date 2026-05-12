import { forwardRef } from "react";
import { useTool } from "../Context/ToolContext.jsx";
import styles from "./Cog.module.css";

const Cog = forwardRef(function Cog(
{
  src,
  size = "40%",
  x = "50%",
  y = "50%",
  speed = 8,
  reverse = false,
  shaft = false,
  paused = false,
  interactive = false,
  itemType = null,
  locked = false,
  ...props
},
ref
) {

  const { currentTool } = useTool();

  const isDragging = currentTool === itemType;

  return (
    <div
      {...props}
      ref={ref}
      className={styles.cog}
      style={{
        cursor: interactive
          ? (
              locked
                ? "not-allowed"
                : (isDragging ? "grabbing" : "grab")
            )
          : "default",

        pointerEvents: interactive
          ? "auto"
          : "none",
        width: size,
        left: x,
        top: y,
        "--speed": `${speed}s`,
        "--direction": reverse ? "reverse" : "normal",

        animationPlayState: paused ? "paused" : "running",

        ...props.style,
      }}
    >
      <img
        src={src}
        draggable="false"
        className={styles.image}
      />

      {shaft && (
        <div className={styles.shaft} />
      )}
    </div>
  );
});

export default Cog;