
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
    description: "The classic 2-player pen & paper game of Tic-Tac-Toe modified with a Timer mechanic. Be quick or else the opponent gains an advantage!",
    tags: ["Python", "Tkinter", "Casual", "2-player", "Completed"],
    projectLink: "",
    category: "Other",
  },
  {
    id: "p8",
    img: deadOnArrival,
    title: "Dead On Arrival",
    description: "A 2D detective-mystery game where a friendly reunion dinner turns into a murder investigation. What shocking truth the Blackwood family is hiding? ",
    tags: ["Godot", "Crime", "Mystery", "2D Detective", "Programmer",],
    projectLink: "https://electrocubic.itch.io/dead-on-arrival",
    category: "Featured",
  },
  {
    id: "p9",
    img: breakBlocked,
    title: "Break Blocked",
    description: "A twist on the classic brick-breaker genre, with a unique camera manipulation mechanic that defies expectations and logic.",
    tags: ["Godot", "GDScript", "Arcade", "Strategy", "Paused"],
    projectLink: "https://github.com/ElectroCubic/break_blocked",
    category: "Prototypes",
  },
  {
    id: "p10",
    img: chronoBot,
    title: "Chrono Bot",
    description: "A top-down puzzle-adventure story game where you play as \"Bobo the Robo\" who gets control over mind-bending Time-loop powers to stop an AI Overlord.",
    tags: ["Godot", "Puzzle", "Adventure", "Screwdriver", "Paused"],
    projectLink: "https://github.com/ElectroCubic/time_travel_game_project",
    category: "Prototypes",
  },
  {
    id: "p11",
    img: fpsShooter,
    title: "FPS Shooter",
    description: "First-person tactical shooter game prototype with smooth movement and a variety of guns.",
    tags: ["Unity", "C#", "FPS", "Shooter", "Paused"],
    projectLink: "",
    category: "Prototypes",
  },
  {
    id: "p12",
    img: squareRunAndGun,
    title: "Square Run n' Gun",
    description: "Pygame prototype featuring a very simple platforming shooter with arcade style scoring, random enemy spawning and backward bullets.",
    tags: ["Python", "PyGame", "Shooter", "Platforming", "Completed"],
    projectLink: "https://github.com/ElectroCubic/Square-Game",
    category: "Prototypes",
  },
  {
    id: "p13",
    img: crashyRoads,
    title: "Crashy Roads",
    description: "My first attempt at making an isometric-view car controller, the goal being surviving from the ememies and obstacles as long as possible.",
    tags: ["Godot", "Isometric", "Car", "Survival", "Paused"],
    projectLink: "",
    category: "Prototypes",
  },
  {
    id: "p14",
    img: beatShooter,
    title: "Beat Shooter",
    description: "An experimental prototype where you shoot bullets on the beat and defeat rhythm-based enemies, while also being bombarded with countless hazards and sick beats.",
    tags: ["Godot", "Rhythm-based", "Bullet-Hell", "Shooter", "Paused"],
    projectLink: "",
    category: "Prototypes",
  },
  {
    id: "p15",
    img: recloned,
    title: "Recloned (REWIND)",
    description: "A story-based sci-fi puzzle platformer where you have the ability of cloning yourself, which reverses your actions, and replays them in a time-loop.",
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
    tags: ["HTML", "CSS", "JavaScript", "Platforming", "Completed"],
    projectLink: "https://electrocubic.github.io/RandomGameWebsite/",
    category: "Other",
  },
  {
    id: "p18",
    img: pizzaToppingsDetector,
    title: "Pizza Toppings Detector",
    description: "Ultralytics YOLO-based multi-label classification model that can detect pizza toppings from an uploaded image and display the type and number of detected toppings.",
    tags: ["Python", "YOLO", "CNNs", "Image Detection", "Software"],
    projectLink: "",
    category: "Other",
  },
  {
    id: "p19",
    img: missing, 
    title: "ASQTFNKX?",
    description: "COWFP_GW_LCRGFDH_LAK_ORPLF?",
    tags: ["404", "DMZF_KI" , "Paused"],
    projectLink: "",
    category: "Prototypes",
  },
  {
    id: "p20",
    img: projectCharlie,
    title: "Project Charlie",
    description: "A fun and casual LAN multiplayer RPG-fighting game inspired from the all-time classic mobile game \"Mini-Militia\".",
    tags: ["Godot", "LAN Multi-Player", "Tactical-RPG", "Action", "Paused"],
    projectLink: "",
    category: "Prototypes",
  },
];
