import { useState } from "react";
import { useGame } from "../Context/GameContext";
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
          className={`
            ${styles.pic}
            ${!showReal ? styles.visible : ""}
          `}
        />

        <img
          src={realPic}
          className={`
            ${styles.pic}
            ${showReal ? styles.visible : ""}
          `}
        />
      </button>
    );
  }

  return (
    <Panel
      isOpen={state.panelRemoved}
      onOpen={() => updateState("panelRemoved")}
      coverImage={logoPic}
      looseAfter={true}
      clickThreshold={5}
      className={styles.noGlow}
    >
      <div className={styles.mechanismLayer}>
        <CogMechanism />
      </div>
    </Panel>
  );
}

export default ProfilePic;