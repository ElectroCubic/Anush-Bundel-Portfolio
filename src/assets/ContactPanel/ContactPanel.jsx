
import styles from "./ContactPanel.module.css"

function ContactPanel()
{
    return(
        <div className={styles.machineInterior}>

            <div className={styles.machineGrid}>
                <div className={styles.coreSlot}>
                    CORE
                </div>
                <div className={styles.cogSlot}>
                    COG
                </div>
                <button className={styles.lever}>
                    POWER
                </button>
            </div>
        </div>
    );
}

export default ContactPanel