import { useGame } from "../Context/GameContext.jsx"
import styles from "./ContactPanel.module.css"
import CogMechanism2 from "../CogMechanism/CogMechanism2.jsx"
import ItemSlot from "../Interactables/ItemSlot/ItemSlot.jsx";
import coreImg from "../Images/Socket.png";

function ContactPanel()
{
    const { state, items, updateState, updateItem } = useGame();

    return(
        <div className={styles.machineGrid}>

            <div className={styles.leverSection}>
                <button
                    className={styles.lever}
                    onClick={() =>
                        updateState("electricityPoweredOn", !state.electricityPoweredOn)
                    }
                    >
                    {state.electricityPoweredOn ? "POWER ON" : "POWER OFF"}
                </button>
            </div>

            <div className={styles.coreSection}>
                <ItemSlot
                    itemType="core"
                    inserted={state.coreInserted}
                    canInsert={true}
                    canRemove={true}

                    onInsert={(slotCenter) => {
                        updateState("coreInserted", true);

                        updateItem("core", {
                            location: "coreMachine",
                            pos: slotCenter,
                        });
                    }}

                    onRemove={(slotCenter) => {
                        updateState("coreInserted", false);

                        updateItem("core", {
                            location: "inventory",

                            pos: {
                                x: slotCenter.x - items.core.offset.x,
                                y: slotCenter.y - items.core.offset.y,
                            },
                        });
                    }}
                >
                    {state.coreInserted ? (

                        <div className={styles.insertedCore}>
                            <img
                                src={coreImg}
                                draggable="false"
                                className={styles.coreImage}
                            />
                        </div>

                    ) : (

                        <div className={styles.coreSlot}>
                            CORE
                        </div>

                    )}
                </ItemSlot>
            </div>

            <div className={styles.mechanismSection}>
                <CogMechanism2 />
            </div>

        </div>
    );
}

export default ContactPanel