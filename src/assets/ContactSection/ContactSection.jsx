import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPaperPlane, faHandshake, faCode, faGamepad } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faItchIo, faDiscord, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useGame } from "../Context/GameContext.jsx";
import Button from "../Button/Button.jsx";
import styles from "./ContactSection.module.css";
import ScrewContainer from "../Tools/ScrewContainer.jsx";
import Panel from "../Interactables/Panel/Panel.jsx";

const LINKS = {
    github: "https://github.com/ElectroCubic",
    linkedin: "https://www.linkedin.com/in/anush-bundel",
    itch: "https://electrocubic.itch.io",
    youtube: "https://www.youtube.com/@ElectroCubicYT",
    discord: "https://discord.com/users/806390493113614346",
    websiteCode: "https://github.com/ElectroCubic/Anush-Bundel-Portfolio"
}

function openExternal(url) 
{
    window.open(url, "_blank", "noopener,noreferrer");
}

function openMail() {
    const email = "anushbundel26@gmail.com";
    const subject = "Let's Connect";
    const body = "Hey Anush,";

    const gmailURL =
        `https://mail.google.com/mail/?view=cm&fs=1` +
        `&to=${encodeURIComponent(email)}` +
        `&su=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

    openExternal(gmailURL);
}

const openGitHub = () => openExternal(LINKS["github"]);
const openLinkedIn = () => openExternal(LINKS["linkedin"]);
const openItchio = () => openExternal(LINKS["itch"]);
const openYouTube = () => openExternal(LINKS["youtube"]);
const openDiscord = () => openExternal(LINKS["discord"]);
const openWebsiteGithubRepo = () => openExternal(LINKS["websiteCode"]);

function ContactSection() 
{
    const { state, updateState } = useGame();

    return (
        <div className={styles.contactSection}>
            <div className={styles.contactBlock}>
                <div className={styles.machinePanelWrapper}>
                    <Panel
                        isOpen={state.machinePanelRemoved}
                        mode="screws"
                        screwArray={[
                            { id: 1, x: 0.04, y: 0.88 },
                            { id: 2, x: 0.92, y: 0.88 }
                        ]}
                        onOpen={() => updateState("machinePanelRemoved")}
                        animationClass={styles.machineSlide}
                        cover={
                            <div className={styles.card}>
                                <div className={styles.contactBtns}>
                                    <Button className={`${styles.brandBtn} ${styles.mailBtn}`} onClick={openMail}>
                                        <span className={styles.iconWrapper} aria-hidden="true">
                                            <FontAwesomeIcon icon={faEnvelope} className={styles.iconPrimary}/>
                                            <FontAwesomeIcon icon={faPaperPlane} className={styles.iconSecondary}/>
                                        </span>
                                        <span>Email Me</span>
                                    </Button>

                                    <Button className={`${styles.brandBtn} ${styles.githubBtn}`} onClick={openGitHub}>
                                        <span className={styles.iconWrapper} aria-hidden="true">
                                            <FontAwesomeIcon icon={faGithub} className={styles.iconPrimary}/>
                                            <FontAwesomeIcon icon={faCode} className={styles.iconSecondary}/>
                                        </span>
                                        <span>Github</span>
                                    </Button>

                                    <Button className={`${styles.brandBtn} ${styles.linkedInBtn}`} onClick={openLinkedIn}>
                                        <span className={styles.iconWrapper} aria-hidden="true">
                                            <FontAwesomeIcon icon={faLinkedin} className={styles.iconPrimary}/>
                                            <FontAwesomeIcon icon={faHandshake} className={styles.iconSecondary}/>
                                        </span>
                                        <span>LinkedIn</span>
                                    </Button>

                                    <Button className={`${styles.brandBtn} ${styles.itchioBtn}`} onClick={openItchio}>
                                        <span className={styles.iconWrapper} aria-hidden="true">
                                            <FontAwesomeIcon icon={faItchIo} className={styles.iconPrimary}/>
                                            <FontAwesomeIcon icon={faGamepad} className={styles.iconSecondary}/>
                                        </span>
                                        <span>Itch.io</span>
                                    </Button>
                                </div>

                                <div className={styles.extraRow}>
                                    <button
                                        className={styles.extraPill}
                                        onClick={openYouTube}
                                        type="button"
                                    >
                                        <span className={styles.pillIcon} aria-hidden="true">
                                            <FontAwesomeIcon icon={faYoutube} />
                                        </span>
                                        <span>ElectroCubicYT</span>
                                    </button>

                                    <button
                                        className={styles.extraPill}
                                        onClick={openDiscord}
                                        type="button"
                                    >
                                        <span className={styles.pillIcon} aria-hidden="true">
                                            <FontAwesomeIcon icon={faDiscord} />
                                        </span>
                                        <span>electrocubic</span>
                                    </button>
                                </div>

                                <div className={styles.metaLine}>
                                    <span> Replies usually within 24-48hrs </span>
                                </div>
                            </div>
                        }
                    >
                        <div className={styles.machineInterior}>

                            {/* <div className={styles.pipe1} />
                            <div className={styles.pipe2} /> */}

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
                    </Panel>
                </div>
            </div>

            <div className={styles.contactText}>
                <h1>Let's Connect!</h1>
                <p>
                    I'm always open to joining teams and building <span className="hl">cool projects</span>. 
                    Whether it's big or small, doesn't matter.
                <br />
                <br />
                    If you're interested in <span className="hl2">collaborating</span> or 
                    just want to exchange some thoughts, feel free to <span className="hl3">reach out.</span>
                <br />
                <br />
                    Even a simple <span className="hl3">'Hi'</span>  works! :D
                </p>
            </div>

            <div className={styles.footer}>
                <div className={styles.footerText}>
                    <div>
                    &copy; {new Date().getFullYear()} Anush Bundel | ElectroCubic
                    </div>

                    <div className={styles.footerSub}>
                        Built using React.js & Vanilla CSS -{" "}
                        <button
                            type="button"
                            className={styles.footerLink}
                            onClick={openWebsiteGithubRepo}
                        >
                            View Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactSection