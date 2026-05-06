import styles from "./Cog.module.css";

function Cog({
  src,
  size = "40%",
  x = "50%",
  y = "50%",
  speed = 8,
  reverse = false,
  shaft = false,
}) {  
  return (
    <div
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
}

export default Cog;