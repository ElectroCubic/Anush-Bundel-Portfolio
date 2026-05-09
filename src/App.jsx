import { useState, useEffect } from "react"
import { useGame } from "./assets/Context/GameContext.jsx"
import NavBar from "./assets/NavBar/NavBar.jsx"
import HeroSection from "./assets/HeroSection/HeroSection.jsx"
import AboutSection from "./assets/AboutSection/AboutSection.jsx"
import ProjectsSection from "./assets/ProjectsSection/ProjectsSection.jsx"
import SkillsSection from "./assets/SkillsSection/SkillsSection.jsx"
import ContactSection from "./assets/ContactSection/ContactSection.jsx"

import WipBanner from "./assets/WipBanner/WipBanner.jsx"

import Tool from "./assets/Tools/Tool.jsx"
import screwdriverImg from "./assets/Images/Screwdriver.png"
import cogImg from "./assets/Images/CogGrey.png"
import coreImg from "./assets/Images/Socket.png"

function App() {

    const { items, state } = useGame();

    return(
        <>
            <NavBar />
            <WipBanner />

            {items.screwdriver.location === "inventory" && (
                <Tool
                    config={{
                        type: "screwdriver",
                        sprite: screwdriverImg,
                        interactionRadius: 25,
                        size: {x: 64, y: 64},
                        offset: items.screwdriver.offset,
                        spawn: items.screwdriver.pos,
                        gravity: {
                            initialVelocity: 0,
                            acceleration: 0.5,
                            interval: 16,
                            maxVelocity: 50,
                        },
                    }}
                />
            )}

            {items.cog.location === "inventory" && (
                <Tool
                    config={{
                        type: "cog",
                        sprite: cogImg,
                        interactionRadius: 70,
                        size: { x: 90, y: 90 },
                        offset: items.cog.offset,
                        spawn: items.cog.pos,
                        gravity: {
                            initialVelocity: 0,
                            acceleration: 0.45,
                            interval: 16,
                            maxVelocity: 50,
                        },
                    }}
                />
            )}

            {items.core.location === "inventory" && (
                <Tool
                    config={{
                        type: "core",
                        sprite: coreImg,
                        interactionRadius: 60,
                        size: { x: 90, y: 90 },
                        offset: items.core.offset,
                        spawn: items.core.pos,
                        gravity: {
                            initialVelocity: 0,
                            acceleration: 0.45,
                            interval: 16,
                            maxVelocity: 50,
                        },
                    }}
                />
            )}
            
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
                <ContactSection />
            </section>
        </>
    );
}
export default App