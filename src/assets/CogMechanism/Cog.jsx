import { forwardRef } from "react";
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
},
ref
) {

  return (
    <div
      ref={ref}
      className={styles.cog}
      style={{
        width: size,
        left: x,
        top: y,

        "--speed": `${speed}s`,
        "--direction": reverse ? "reverse" : "normal",
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