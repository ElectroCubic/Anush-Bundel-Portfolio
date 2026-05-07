import { useState, useRef } from "react"
import { useGame } from "../Context/GameContext.jsx"
import ScrewContainer from "../Tools/ScrewContainer.jsx"
import styles from "./CogMechanism.module.css"
import cogImg1 from "../Images/CogBlue.png"
import cogImg2 from "../Images/CogGrey.png"
import Cog from "./Cog.jsx"

function CogMechanism() {
  const { state, items, updateItem } = useGame();
  const cogRef = useRef();

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
            speed={20}
            shaft={true}
            reverse
        />

        <Cog
            src={cogImg2}
            size="10%"
            x="89%"
            y="81%"
            speed={1}
            shaft={true}
            reverse
        />

    {items.cog.location === "cogMechanism" && (
        <ScrewContainer
            enabled={state.panelRemoved}
            screwArray={[
                { id: 1, x: 0.2325, y: 0.1225 }
            ]}
            onComplete={() => {
                const rect = cogRef.current?.getBoundingClientRect();
                if (!rect) return;

                updateItem("cog", {
                    location: "inventory",
                    pos: {
                        x: rect.left,
                        y: rect.top,
                    }
                });
            }}
        >
            <Cog
                ref={cogRef}
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