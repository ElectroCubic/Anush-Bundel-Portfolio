import { useState, useEffect } from "react"
import { useGame } from "./assets/Context/GameContext.jsx"
import NavBar from "./assets/NavBar/NavBar.jsx"
import HeroSection from "./assets/HeroSection/HeroSection.jsx"
import AboutSection from "./assets/AboutSection/AboutSection.jsx"
import ProjectsSection from "./assets/ProjectsSection/ProjectsSection.jsx"
import SkillsSection from "./assets/SkillsSection/SkillsSection.jsx"
import ContactSection from "./assets/ContactSection/ContactSection.jsx"

import WipBanner from "./assets/WipBanner/WipBanner.jsx"

import Tool from "./assets/Tools/Tool"
import screwdriverImg from "./assets/Screwdriver.png"

function App() {

    const { state, updateState } = useGame();

    return(
        <>
            <NavBar />
            <WipBanner />
            <section id="home">
                <HeroSection />
            </section>
            <section id="about">
                <AboutSection />
            </section>
            <section id="projects">
                <ProjectsSection />
            </section>
            <section id="skills">
                <SkillsSection />
            </section>
            <section id="contact">
                {state.hasScrewdriver && (
                    <Tool
                        config={{
                            type: "screwdriver",
                            sprite: screwdriverImg,
                            size: {x: 64, y: 64},
                            offset: { x: 20, y: 45 },
                            spawn: { x: 200, y: 0 },
                            gravity: {
                                initialVelocity: 0,
                                acceleration: 0.5,
                                interval: 16,
                                maxVelocity: 50,
                            },
                        }}
                    />
                )}

                <ContactSection />
                {!state.hasScrewdriver && (
                    <button onClick={() => updateState("hasScrewdriver")}>
                        Get Screwdriver
                    </button>
                )}
            </section>
        </>
    );
}
export default App