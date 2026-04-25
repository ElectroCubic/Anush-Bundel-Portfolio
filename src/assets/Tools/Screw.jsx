import styles from "./Screw.module.css";
import screwImg from "../Screw.png";

function Screw({ x, y, isActive, isRemoving }) {
  return (
    <div
      className={`${styles.screw} ${isActive ? styles.active : ""}`}
      style={{ left: x, top: y }}
    >
      <img 
        src={screwImg}
        className={isRemoving ? styles.removing : ""}
        draggable="false" 
      />
    </div>
  );
}

export default Screw;