import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Screwdriver.module.css";
import screwdriverPic from "../Screwdriver.png";

function Screwdriver(props = { holding, setHolding, setToolPos}) {

  const SCROLL_BAR_WIDTH = 10;
  const CONFIG = {
    size: 64,
    offsetX: 20,
    offsetY: 45,
    gravity: {
      initialVelocity: 0,
      acceleration: 0.5,
      interval: 16,      // ms (approx. 60fps)
      maxVelocity: 50
    },
    spawn: {
      x: 200,
      y: 0,
    }
  };

  const [pos, setPos] = useState(CONFIG.spawn);
  const [isDropping, setIsDropping] = useState(true);
  
  // Send Position
  useEffect(() => {
    props.setToolPos(pos);
  }, [pos]);

  // Follow mouse when holding
  useEffect(() => {
    const move = (e) => {
      if (props.holding === "screwdriver") {
        const x = Math.max(
          0,
          Math.min(window.innerWidth - CONFIG.size - SCROLL_BAR_WIDTH, e.clientX - CONFIG.offsetX)
        );

        const y = Math.max(0, e.clientY - CONFIG.offsetY);

        setPos({ x, y });
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [props.holding]);

  // Gravity
  useEffect(() => {
    if (!isDropping) return;

    let velocity = CONFIG.gravity.initialVelocity;

    const interval = setInterval(() => {
      setPos((prev) => {
        const bottom = window.innerHeight - CONFIG.size;

        velocity = Math.min(
            velocity + CONFIG.gravity.acceleration, 
            CONFIG.gravity.maxVelocity
        );

        let nextY = prev.y + velocity;

        if (nextY >= bottom) {
          clearInterval(interval);
          setIsDropping(false);
          return { ...prev, y: bottom };
        }

        return {
          ...prev,
          y: nextY,
        };
      });
    }, CONFIG.gravity.interval);

    return () => clearInterval(interval);
  }, [isDropping]);

  // Drop on mouse release
  useEffect(() => {
    const up = () => {
      if (props.holding === "screwdriver") {
        setTimeout(() => {
            props.setHolding(null);
            setIsDropping(true);
        }, 0);
      }
    };

    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, [props.holding, props.setHolding]);

  useEffect(() => {
    if (props.holding === "screwdriver") {
        props.onMove?.(pos);
    }
  }, [pos]);

  return (
    <div
      className={styles.screwdriver}
      onMouseDown={(e) => {
        e.stopPropagation();
        props.setHolding("screwdriver");
        setIsDropping(false);
      }}
      style={{ left: pos.x, top: pos.y }}
    >
      <img src={screwdriverPic} draggable="false" />
    </div>
  );
}

Screwdriver.propTypes = {
    holding: PropTypes.string,
    setHolding: PropTypes.func
}

export default Screwdriver