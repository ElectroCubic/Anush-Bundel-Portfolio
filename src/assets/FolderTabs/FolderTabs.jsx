
import { useState } from "react"

import styles from "./FolderTabs.module.css"

function FolderTabs()
{
    const [activeTab, setActiveTab] = useState("education");


    return(
        <div className={styles.container}>

        <div className={styles.tabBar}>
            <button
                className={activeTab === "education"
                    ? styles.activeTab
                    : styles.tab}
                onClick={() => setActiveTab("education")}
            >
                Education
            </button>

            <button
                className={activeTab === "experience"
                    ? styles.activeTab
                    : styles.tab}
                onClick={() => setActiveTab("experience")}
            >
                Experience
            </button>

            <button
                className={activeTab === "achievements"
                    ? styles.activeTab
                    : styles.tab}
                onClick={() => setActiveTab("achievements")}
            >
                Achievements
            </button>
        </div>

        <div className={styles.contentPanel}>

            {activeTab === "education" && (
                // <EducationContent />
                <p>Education</p>
            )}

            {activeTab === "experience" && (
                // <ExperienceContent />
                <p>Experience</p>
            )}

            {activeTab === "achievements" && (
                // <AchievementContent />
                <p>Acheivements</p>
            )}

        </div>

    </div>
    );
}

export default FolderTabs