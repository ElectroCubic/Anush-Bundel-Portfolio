import { useState, useEffect } from "react";
import { ToolProvider } from "./assets/Context/ToolContext.jsx";
import NavBar from "./assets/NavBar/NavBar.jsx"
import HeroSection from "./assets/HeroSection/HeroSection.jsx"
import AboutSection from "./assets/AboutSection/AboutSection.jsx"
import ProjectsSection from "./assets/ProjectsSection/ProjectsSection.jsx"
import SkillsSection from "./assets/SkillsSection/SkillsSection.jsx"
import ContactSection from "./assets/ContactSection/ContactSection.jsx"

import WipBanner from "./assets/WipBanner/WipBanner.jsx"

import ScrewContainer from "./assets/Tools/ScrewContainer.jsx";
import Tool from "./assets/Tools/Tool";
import screwdriverImg from "./assets/Screwdriver.png"

function App() {
    const [hasScrewdriver, setHasScrewdriver] = useState(false);

    return(
        <>
            <ToolProvider>
                <NavBar />
                <WipBanner />
                {!hasScrewdriver && (
                    <button onClick={() => setHasScrewdriver(true)}>
                        Get Screwdriver
                    </button>
                )}
                
                {hasScrewdriver && (
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

                <ScrewContainer 
                    screwArray={[
                        {id: 1, x: 80, y: 40},
                        {id: 2, x: 120, y:40}
                    ]}
                    onComplete={() => console.log("opened!")}
                >
                    <div style={{ width: 200, height: 120, background: "#444"}} />
                </ScrewContainer>

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
            </ToolProvider>    
        </>
    );
}
export default App