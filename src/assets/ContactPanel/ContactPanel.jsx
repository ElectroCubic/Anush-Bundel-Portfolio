import { useGame } from "../Context/GameContext.jsx"
import styles from "./ContactPanel.module.css"
import CogMechanism2 from "../CogMechanism/CogMechanism2.jsx"

function ContactPanel()
{
    const { state, updateState } = useGame();

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
                <div className={styles.coreSlot}>
                    CORE
                </div>
            </div>

            <div className={styles.mechanismSection}>
                <CogMechanism2 />
            </div>

        </div>
    );
}

export default ContactPanel