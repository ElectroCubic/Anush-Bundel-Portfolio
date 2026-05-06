import { useState } from "react"
import { useGame } from "../../Context/GameContext.jsx"
import ScrewContainer from "../../Tools/ScrewContainer.jsx"
import styles from "./CogMechanism.module.css"
import cogImg from "../../CordPlug.png"
import Cog from "./Cog.jsx"

function CogMechanism() {
  const { state, updateState } = useGame();

  return (
    <div className={styles.wrapper}>
        <Cog
            src={cogImg}
            size="10%"
            x="30%"
            y="70%"
            speed={12}
            reverse
        />

    {!state.cogRemoved && (
        <ScrewContainer
            enabled={state.panelRemoved}
            screwArray={[
                { id: 1, x: 0.5, y: 0.5 }
            ]}
            onComplete={() => {
                updateState("cogRemoved");
                updateState("hasCog"); 
            }}
        >
            <Cog
                src={cogImg}
                size="25%"
                x="70%"
                y="30%"
                speed={6}
            />
        </ScrewContainer>
    )}
    </div>
  );
}

export default CogMechanism