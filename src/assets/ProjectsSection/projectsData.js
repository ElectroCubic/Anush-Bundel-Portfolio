
import cursedFrostbite from "../Videos/CursedFrostbite.mp4";
import dreamSequencer from "../Videos/DreamSequencer.mp4";
import dungeonMan from "../Videos/DungeonMan.mp4";
import funkyBlueprints from "../Videos/FunkyBlueprints.mp4";
import miniBrawlers from "../Videos/MiniBrawlers.mp4";
import spaceSlimeInvasion from "../Videos/SpaceSlimeInvasion.mp4";

import beatShooter from "../Screenshots/BeatShooter.png"
import breakBlocked from "../Screenshots/BreakBlocked.png"
import chronoBot from "../Screenshots/ChronoBot.png"
import crashyRoads from "../Screenshots/CrashyRoads.png"
import projectCharlie from "../Screenshots/ProjectCharlie.png"
import squareRunAndGun from "../Screenshots/SquareRunAndGun.png"
import fpsShooter from "../Screenshots/FPS_Shooter.png"
import randomGameWebsite from "../Screenshots/RandomGameWebsite.png"
import missing from "../Screenshots/missing.png"
import recloned from "../Screenshots/Recloned.png"
import pizzaToppingsDetector from "../Screenshots/PizzaToppingsDetector.png"
import ticTacGo from "../Screenshots/TicTacGo.png"
import imapps from "../Screenshots/imapps.png"
import deadOnArrival from "../Screenshots/DeadOnArrival.png"

export const PROJECTS = [
  {
    id: "p1",
    img: cursedFrostbite,
    title: "The Cursed Frostbite",
    description: "A tricky platformer featuring the Icy Caverns and mountain-tops full of dangerous obstacles and forbidden secrets.",
    tags: ["Godot", "GDScript", "Figma", "Game Jam", "Platformer"],
    projectLink: "https://electrocubic.itch.io/the-cursed-frostbite",
    category: "Featured",
  },
  {
    id: "p2",
    img: dungeonMan,
    title: "Dungeon Man",
    description: "A survival-horror inspired by Pacman, find the treasure and avoid the lurking monsters in the dark dungeon using your supernatural radar.",
    tags: ["Godot", "GDScript", "Survial-horror", "Aseprite", "FL Studio"],
    projectLink: "https://electrocubic.itch.io/dungeon-man",
    category: "Featured",
  },
  {
    id: "p3",
    img: funkyBlueprints,
    title: "Funky Bluprints",
    description: "Physics-based drawing puzzle game where your imagination is the limit. Get the heart to the goal and pray you don't end up getting stuck in the ceiling.",
    tags: ["Godot", "GDScript", "Game Jam", "Puzzle", "Designer"],
    projectLink: "https://bharathk33.itch.io/funkyblueprints",
    category: "Featured",
  },
  {
    id: "p4",
    img: dreamSequencer,
    title: "Dream Sequencer",
    description: "A platforming challenge inside the depths of the Dream Realm, featuring mind-bending puzzles bounded by nothingness, find a way to escape from the nightmares.",
    tags: ["Godot", "GDScript", "Puzzle", "Programmer", "Game Jam"],
    projectLink: "https://electrocubic.itch.io/dream-sequencer",
    category: "Featured",
  },
  {
    id: "p5",
    img: spaceSlimeInvasion,
    title: "Space Slime Invasion",
    description: "Defend your spacehip from hordes of Space Slimes invading and activate the slip-drive in time to save humanity from extinction.",
    tags: ["Defold", "Platformer", "Shooter", "Game Jam", "Programmer"],
    projectLink: "https://electrocubic.itch.io/dream-sequencer",
    category: "Featured",
  },
  {
    id: "p6",
    img: miniBrawlers,
    title: "Mini Brawlers",
    description: "Survive endless waves of monsters, while protecting your fellow Dudes from getting harmed in this chaotic top-down shooter.",
    tags: ["Godot", "Solo", "Ludum Dare 56", "Shooter", "Survival"],
    projectLink: "https://electrocubic.itch.io/mini-brawlers",
    category: "Featured",
  },
  {
    id: "p7",
    img: ticTacGo,
    title: "Tic Tac Go!",
    description: "The classic 2-Player Pen & Paper game of Tic Tac Toe with a New Twist!",
    tags: ["Python", "Tkinter", "Casual", "2-player"],
    projectLink: "",
    category: "Other",
  },
  {
    id: "p8",
    img: deadOnArrival,
    title: "Dead On Arrival",
    description: "A 2D detective-mystery game where you solve cases and uncover shocking truths and mysteries.",
    tags: ["Godot", "Crime", "Mystery", "2D Detective", "Programmer",],
    projectLink: "https://electrocubic.itch.io/dead-on-arrival",
    category: "Featured",
  },
  {
    id: "p9",
    img: breakBlocked,
    title: "Break Blocked",
    description: "",
    tags: ["Godot", "GDScript", "Arcade", "Strategy", "Paused"],
    projectLink: "https://github.com/ElectroCubic/break_blocked",
    category: "Prototypes",
  },
  {
    id: "p10",
    img: chronoBot,
    title: "Chrono Bot",
    description: "",
    tags: ["Godot", "GDScript", "Puzzle", "Figma", "Paused"],
    projectLink: "https://github.com/ElectroCubic/time_travel_game_project",
    category: "Prototypes",
  },
  {
    id: "p11",
    img: fpsShooter,
    title: "FPS Shooter",
    description: "",
    tags: ["Unity", "C#", "FPS", "Shooter", "In Progress"],
    projectLink: "",
    category: "Prototypes",
  },
  {
    id: "p12",
    img: squareRunAndGun,
    title: "Square Run n' Gun",
    description: "",
    tags: ["Python", "PyGame", "Shooter", "Platforming", "Completed"],
    projectLink: "https://github.com/ElectroCubic/Square-Game",
    category: "Prototypes",
  },
  {
    id: "p13",
    img: crashyRoads,
    title: "Crashy Roads",
    description: "",
    tags: ["Godot", "Isometric", "Car", "Survival", "Paused"],
    projectLink: "",
    category: "Prototypes",
  },
  {
    id: "p14",
    img: beatShooter,
    title: "Beat Shooter",
    description: "",
    tags: ["Godot", "GDScript", "Rhythm", "Bullet-Hell", "Paused"],
    projectLink: "",
    category: "Prototypes",
  },
  {
    id: "p15",
    img: recloned,
    title: "Recloned (REWIND)",
    description: "",
    tags: ["Unity", "C#", "Puzzle", "Platforming", "In Progress"],
    projectLink: "",
    category: "Prototypes",
  },
  {
    id: "p16",
    img: imapps,
    title: "IMAPPS",
    description: "An interactive multi-agent pathfinding simulator in Python using Pygame, and multi-processing modules for parallel A* path computations and optimizations.",
    tags: ["Python", "PyGame", "Pathfinding", "Software", ],
    projectLink: "https://github.com/ElectroCubic/Multi-Agent-Pathfinding-Sim",
    category: "Other",
  },
  {
    id: "p17",
    img: randomGameWebsite,
    title: "Random Game Website",
    description: "A platforming-rage game designed to test the user's patience in creating a simple account! >:)",
    tags: ["HTML", "CSS", "JavaScript", "Platforming", "Rage"],
    projectLink: "https://electrocubic.github.io/RandomGameWebsite/",
    category: "Other",
  },
  {
    id: "p18",
    img: pizzaToppingsDetector,
    title: "Pizza Toppings Detector",
    description: "",
    tags: ["Python", "YOLO", "CNNs", "Image Detection", "Software"],
    projectLink: "",
    category: "Other",
  },
  {
    id: "p19",
    img: missing, 
    title: "???",
    description: "???",
    tags: ["404", "error", "In Progress"],
    projectLink: "",
    category: "Prototypes",
  },
  {
    id: "p20",
    img: projectCharlie,
    title: "Project Charlie",
    description: "",
    tags: ["Godot", "GDScript", "LAN Multi-Player", "Tactical", "Paused"],
    projectLink: "",
    category: "Prototypes",
  },
];
