import { useGame } from "../Context/GameContext.jsx"
import styles from "./CogMechanism2.module.css"
import cogImg1 from "../Images/CogBlue.png"
import cogImg2 from "../Images/CogGrey.png"
import Cog from "./Cog.jsx"
import ItemSlot from "../Interactables/ItemSlot/ItemSlot.jsx";

function CogMechanism2() {
  const { state, items, updateItem, updateState } = useGame();

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

        <ItemSlot
            itemType="cog"
            inserted={state.cogInserted}
            canInsert={!powered}
            canRemove={!powered}
            onInsert={(slotCenter) => {
                updateState("cogInserted", true);

                updateItem("cog", {
                    location: "coreMachine",
                    pos: slotCenter,
                });
            }}

            onRemove={(slotCenter) => {
                updateState("cogInserted", false);

                updateItem("cog", {
                    location: "inventory",

                    pos: {
                        x: slotCenter.x - items.cog.offset.x,
                        y: slotCenter.y - items.cog.offset.y,
                    },
                });
            }}
        >
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
                    interactive={true}
                    itemType="cog"
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

        </ItemSlot>

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

export default CogMechanism2