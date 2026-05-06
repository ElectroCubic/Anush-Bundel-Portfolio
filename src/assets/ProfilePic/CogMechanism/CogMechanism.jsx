import { useState } from "react"
import { useGame } from "../../Context/GameContext.jsx"
import ScrewContainer from "../../Tools/ScrewContainer.jsx"
import styles from "./CogMechanism.module.css"
import cogImg1 from "../../CogBlue.png"
import cogImg2 from "../../CogGrey.png"
import Cog from "./Cog.jsx"

function CogMechanism() {
  const { state, updateState } = useGame();

  return (
    <div className={styles.wrapper}>
        <Cog
            src={cogImg1}
            size="50%"
            x="70%"
            y="30%"
            speed={6}
            shaft={true}
        />

        <Cog
            src={cogImg1}
            size="35%"
            x="39%"
            y="52%"
            speed={6}
            reverse
            shaft={true}
        />

        <Cog
            src={cogImg1}
            size="30%"
            x="54%"
            y="76%"
            speed={6}
            shaft={true}
        />

        <Cog
            src={cogImg2}
            size="20%"
            x="8%"
            y="22%"
            speed={3}
            shaft={true}
        />

        <Cog
            src={cogImg2}
            size="60%"
            x="25%"
            y="82%"
            speed={3}
            shaft={true}
            reverse
        />

    {!state.cogRemoved && (
        <ScrewContainer
            enabled={state.panelRemoved}
            screwArray={[
                { id: 1, x: 0.2325, y: 0.1225 }
            ]}
            onComplete={() => {
                updateState("cogRemoved");
                updateState("hasCog"); 
            }}
        >
            <Cog
                src={cogImg2}
                size="25%"
                x="27%"
                y="16%"
                speed={3}
                reverse
            />
        </ScrewContainer>
    )}
    </div>
  );
}

export default CogMechanism