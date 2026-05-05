import { useState, useEffect } from "react";
import { useGame } from "../Context/GameContext";
import styles from "./ProfilePic.module.css";
import realPic from "../AnushBundel.png";
import logoPic from "../ElectroCubicLogo_New.png";

function ProfilePic() {
  const { state, updateState } = useGame();

  const [showReal, setShowReal] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [isDropping, setIsDropping] = useState(false);

  const handleClick = () => {
    if (!state.gridSolved) {
      setShowReal((v) => !v);
      return;
    }

    if (state.panelRemoved) return;

    setClickCount((prev) => {
      const next = prev + 1;

      if (next > 5) {
        setIsDropping(true);

        setTimeout(() => {
          updateState("panelRemoved");
        }, 1000); 
      }

      return next;
    });
  };

  useEffect(() => {
    if (state.gridSolved && clickCount === 0) {
      setClickCount(1);
      updateState("panelLoose");
    }
  }, [state.gridSolved]);

  const tilt = state.panelLoose
    ? Math.min(clickCount * 3, 15)  // degree rotation per click
    : 0;

  return (
    <div className={styles.wrapper}>
      {!state.panelRemoved && (
        <button
          className={`
            ${styles.profileContainer}
            ${state.gridSolved ? styles.noGlow : ""}
            ${isDropping ? styles.dropping : ""}
          `}
          onClick={handleClick}
          style={{
            transform: state.gridSolved && !isDropping
              ? `rotate(${tilt}deg) translateY(${tilt * 2}px)`
              : undefined,
              "--tilt": `${tilt}deg`,
              "--tiltHeight": `${tilt * 2}px`
          }}
        >
          {!state.gridSolved && (
            <>
              <img
                src={logoPic}
                className={`${styles.pic} ${styles.logo} ${
                  !showReal ? styles.visible : ""
                }`}
                draggable="false"
              />
              <img
                src={realPic}
                className={`${styles.pic} ${styles.photo} ${
                  showReal ? styles.visible : ""
                }`}
                draggable="false"
              />
            </>
          )}

          {state.gridSolved && (
            <img
              src={logoPic}
              className={`${styles.pic} ${styles.visible}`}
              draggable="false"
            />
          )}
        </button>
      )}
    </div>
  );
}

export default ProfilePic;