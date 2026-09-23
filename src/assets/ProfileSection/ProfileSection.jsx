
import FolderTabs from "../FolderTabs/FolderTabs.jsx"
import styles from "./ProfileSection.module.css"

function ProfileSection()
{
    return(
        <div className={styles.profileSection}>
            <FolderTabs />
        </div>
    );
}
export default ProfileSection;