import styles from "./Screw.module.css";
import screwImg from "../Images/Screw.png";

function Screw({ x, y, isActive, isRemoving }) {
  return (
    <div
      className={`${styles.screw} ${isActive ? styles.active : ""}`}
      style={{
        left: `${x * 100}%`,
        top: `${y * 100}%`,
      }}
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