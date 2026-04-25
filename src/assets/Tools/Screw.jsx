import styles from "./Screw.module.css";

function Screw({ x, y, isActive }) {
  return (
    <div
      className={`${styles.screw} ${isActive ? styles.active : ""}`}
      style={{ left: x, top: y }}
    />
  );
}

export default Screw;