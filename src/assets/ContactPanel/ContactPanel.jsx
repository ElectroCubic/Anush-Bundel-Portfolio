import styles from "./ContactPanel.module.css"

function ContactPanel()
{
    return(
        <div className={styles.machineGrid}>

            <div className={styles.leverSection}>
                <button className={styles.lever}>
                    POWER
                </button>
            </div>

            <div className={styles.coreSection}>
                <div className={styles.coreSlot}>
                    CORE
                </div>
            </div>

            <div className={styles.mechanismSection}>
                <div className={styles.cogSlot}>
                    COG
                </div>
            </div>

        </div>
    );
}

export default ContactPanel