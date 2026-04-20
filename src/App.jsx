import { useState, useEffect } from "react";
import NavBar from "./assets/NavBar/NavBar.jsx"
import HeroSection from "./assets/HeroSection/HeroSection.jsx"
import AboutSection from "./assets/AboutSection/AboutSection.jsx"
import ProjectsSection from "./assets/ProjectsSection/ProjectsSection.jsx"
import SkillsSection from "./assets/SkillsSection/SkillsSection.jsx"
import ContactSection from "./assets/ContactSection/ContactSection.jsx"

import WipBanner from "./assets/WipBanner/WipBanner.jsx"
import Screwdriver from "./assets/Tools/Screwdriver.jsx"
import Screw from "./assets/Tools/Screw.jsx"

function App() {
    const [hasScrewdriver, setHasScrewdriver] = useState(false);
    const [holding, setHolding] = useState(null);
    const [toolPos, setToolPos] = useState({ x: 0, y: 0 });
    const [screwCount, setScrewCount] = useState(0);

    const SCREW_RADIUS = 25;

    const TIP_OFFSET = {
        x: 58, // near right edge
        y: 6   // near top
    };

    const getToolTip = (pos) => ({
        x: pos.x + TIP_OFFSET.x,
        y: pos.y + TIP_OFFSET.y,
    });

    const isNearScrew = (a, b) => {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy) < SCREW_RADIUS;
    };

    const [screws, setScrews] = useState([
        { id: 1, x: 300, y: 200 },
        { id: 2, x: 500, y: 200 },
    ]);

    const removeScrew = (id) => {
        setScrews((prev) => prev.filter((s) => s.id !== id));
        setScrewCount((prev) => prev + 1);
    };

    useEffect(() => {
        const handleMouseUp = () => {
            if (holding !== "screwdriver") return;

            const target = screws.find((screw) =>
                isNearScrew(getToolTip(toolPos), { x: screw.x, y: screw.y })
            );

            if (target) {
                removeScrew(target.id);
            }
        };

        window.addEventListener("mouseup", handleMouseUp);
        return () => window.removeEventListener("mouseup", handleMouseUp);
    }, [holding, toolPos, screws]);

    return(
        <>
            <NavBar />
            <WipBanner />
            {!hasScrewdriver && (
                <button onClick={() => setHasScrewdriver(true)}>
                    Get Screwdriver
                </button>
            )}
            
            {hasScrewdriver && (
                <Screwdriver 
                    holding={holding} 
                    setHolding={setHolding}
                    setToolPos={setToolPos} 
                />
            )}

            {screws.map((screw) => {
                const active = (
                    holding === "screwdriver" && 
                    isNearScrew(getToolTip(toolPos), { x: screw.x, y: screw.y })
                );

                return (
                    <Screw
                        key={screw.id}
                        x={screw.x}
                        y={screw.y}
                        isActive={active}
                    />
                );
            })}
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