import { useState } from "react";
import { useGame } from "../Context/GameContext.jsx";
import styles from "./ProfilePic.module.css";
import logoPic from "../Images/ElectroCubicLogo_New.png";
import realPic from "../Images/AnushBundel.png";
import CogMechanism from "../CogMechanism/CogMechanism.jsx";
import Panel from "../Interactables/Panel/Panel.jsx";

function ProfilePic() {
  const { state, updateState } = useGame();
  const [showReal, setShowReal] = useState(true);

  if (!state.gridSolved) {
    return (
      <button
        className={styles.profileContainer}
        onClick={() => setShowReal(v => !v)}
      >
        <img
          src={logoPic}
          draggable="false"
          loading="lazy"
          className={`
            ${styles.pic}
            ${!showReal ? styles.visible : ""}
          `}
        />

        <img
          src={realPic}
          draggable="false"
          className={`
            ${styles.pic}
            ${showReal ? styles.visible : ""}
          `}
        />
      </button>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Panel
        isOpen={state.panelRemoved}
        animationDuration={1200}
        onOpen={() => updateState("panelRemoved")}
        looseAfter={true}
        clickThreshold={5}
        animationClass={styles.panelFall}
        cover={
          <img
            src={logoPic}
            className={styles.cover}
            draggable="false"
            loading="lazy"
          />
        }
      >

        <div className={styles.mechanismLayer}>
          <CogMechanism />
        </div>
      </Panel>
    </div>
  );
}

export default ProfilePic;