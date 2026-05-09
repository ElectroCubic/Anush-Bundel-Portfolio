import { useEffect, useState } from "react";
import { useTool } from "../Context/ToolContext.jsx";
import styles from "./Tool.module.css";

function Tool({ config }) {
  const { type, sprite, size, offset, gravity, spawn, interactionRadius } = config;

  const width = size.x;
  const height = size.y;

  const { currentTool, setCurrentTool, setToolPos, setDropEvent } = useTool();
  
  const isEquipped = currentTool === type;
  
  const [pos, setPos] = useState(spawn);

  useEffect(() => {
    if (spawn) {
      setPos(spawn);
    }
  }, [spawn]);

  const [isDropping, setIsDropping] = useState(currentTool !== type);

  useEffect(() => {
    if (isEquipped) {
      setIsDropping(false);
    }

  }, [currentTool]);

  // sync global pos
  useEffect(() => {
    setToolPos(pos);
  }, [pos]);

  // follow mouse
  useEffect(() => {
    const move = (e) => {
      if (isEquipped) {
        const x = Math.max(
          0,
          Math.min(window.innerWidth - width, e.clientX - offset.x)
        );

        const y = Math.max(0, e.clientY - offset.y);

        setPos({ x, y });
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [currentTool]);

  // gravity
  useEffect(() => {
    if (!isDropping) return;

    let velocity = gravity.initialVelocity;

    const interval = setInterval(() => {
      setPos((prev) => {
        const bottom = window.innerHeight - height;

        velocity = Math.min(
          velocity + gravity.acceleration,
          gravity.maxVelocity
        );

        let nextY = prev.y + velocity;

        if (nextY >= bottom) {
          clearInterval(interval);
          setIsDropping(false);
          return { ...prev, y: bottom };
        }

        return { ...prev, y: nextY };
      });
    }, gravity.interval);

    return () => clearInterval(interval);
  }, [isDropping]);

  // drop
  useEffect(() => {
    const up = () => {
      if (isEquipped) {
        setDropEvent({
          tool: type,

          pos: {
            x: pos.x + width / 2,
            y: pos.y + height / 2,
          },

          radius: interactionRadius
        });

        setCurrentTool(null);
        setIsDropping(true);
      }
    };

    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, [currentTool, pos]);

  return (
    <div
      className={styles.tool}
      onMouseDown={(e) => {
        e.stopPropagation();
        setCurrentTool(type);
        setIsDropping(false);
      }}
      style={{
        left: pos?.x ?? 0,
        top: pos?.y ?? 0,
        cursor: isEquipped ? "grabbing" : "grab",
      }}
    >
      <img
        src={sprite}
        draggable="false"
        style={{ width: width, height: height }}
      />
    </div>
  );
}

export default Tool;