import { useEffect, useState } from "react";
import { useGame } from "../Context/GameContext";
import styles from "./CircularProgressAvatar.module.css";

function CircularProgressAvatar({
  src,
  size = 64,
  stroke = 4,
}) {

  const { progress } = useGame();
  const completed = progress.completed;
  const total = progress.total;

  const radius = size / 2;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  const unit = circumference / total;
  const gap = 4;
  const segment = unit - gap;

  const [activatingIndex, setActivatingIndex] = useState(null);
  const [prevCompleted, setPrevCompleted] = useState(completed);

  useEffect(() => {
    if (completed > prevCompleted) {
      const idx = completed - 1;
      setActivatingIndex(idx);

      const t = setTimeout(() => setActivatingIndex(null), 400);
      setPrevCompleted(completed);
      return () => clearTimeout(t);
    }
  }, [completed, prevCompleted]);

  return (
    <div
      className={styles.wrapper}
      style={{ width: size, height: size }}
    >
      {completed === 0 && (
        <div className={styles.idleWrapper}>
          <img src={src} loading="lazy" draggable="false" className={styles.avatar} />
        </div>
      )}

      {completed > 0 && (
        <>
          <svg width={size} height={size} className={styles.svg}>
            {Array.from({ length: total }).map((_, i) => {
              const isActive = i < completed;
              const isAnimating = i === activatingIndex;

              return (
                <circle
                  key={i}
                  className={styles.segment}
                  data-active={isActive}
                  data-animating={isAnimating}
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  strokeDasharray={
                    isAnimating
                      ? `0 ${circumference}`
                      : `${segment} ${circumference}`
                  }
                  strokeDashoffset={-i * unit}
                  style={{
                    "--circumference": circumference,
                    "--segment": segment,
                  }}
                />
              );
            })}
          </svg>

          <img src={src} loading="lazy" draggable="false" className={styles.avatar} />
        </>
      )}
    </div>
  );
}

export default CircularProgressAvatar;