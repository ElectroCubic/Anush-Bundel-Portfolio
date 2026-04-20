import PropTypes from "prop-types";
import styles from "./Screw.module.css";

function Screw({ x, y, isActive}) {
  return (
    <div
      className={`${styles.screw} ${isActive ? styles.active : ""}`}
      style={{ left: x, top: y }}
    />
  );
}

Screw.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    isActive: PropTypes.bool
}

export default Screw;