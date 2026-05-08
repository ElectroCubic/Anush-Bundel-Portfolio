import { useGame } from "../Context/GameContext.jsx"
import styles from "./CogMechanism2.module.css"
import cogImg1 from "../Images/CogBlue.png"
import cogImg2 from "../Images/CogGrey.png"
import Cog from "./Cog.jsx"

function CogMechanism() {
  const { state, items, updateItem } = useGame();

  const powered = state.electricityPoweredOn;

  return (
    <div className={styles.wrapper}>
        <Cog
            src={cogImg1}
            size="30%"
            x="85%"
            y="12%"
            speed={8}
            reverse
            shaft={true}
            paused={!powered}
        />

        <Cog
            src={cogImg2}
            size="22%"
            x="96%"
            y="32%"
            speed={5}
            shaft={true}
            paused={!powered}
        />

        {state.cogInserted ? (
            <Cog
                src={cogImg2}
                size="18%"
                x="83%"
                y="50%"
                speed={5}
                reverse
                shaft={true}
                paused={!powered}
            />
        ) : (
            <div
                className={styles.cogSlot}
                style={{
                    left: "83%",
                    top: "50%",
                }}
            >
                <div className={styles.slotShaft} />
            </div>
        )}

        <Cog
            src={cogImg2}
            size="14%"
            x="93%"
            y="65%"
            speed={5}
            shaft={true}
            paused={!powered}
        />

        <Cog
            src={cogImg1}
            size="23%"
            x="85%"
            y="83%"
            speed={6}
            reverse
            shaft={true}
            paused={!powered}
        />

        <Cog
            src={cogImg1}
            size="35%"
            x="64%"
            y="105%"
            speed={6}
            shaft={true}
            paused={!powered}
        />
    </div>
  );
}

export default CogMechanism