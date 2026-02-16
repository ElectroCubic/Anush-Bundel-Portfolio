import { useEffect, useRef, forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "./ProjectCard.module.css";

const TAG_CATEGORY_CLASS = {
  engine: styles.tagEngine,
  tool: styles.tagTool,
  language: styles.tagLang,
  platform: styles.tagPlatform,
  role: styles.tagRole,
  genre: styles.tagGenre,
  type: styles.tagType,
  status: styles.tagStatus,
  misc: styles.tagMisc,
};

const TAG_CATEGORY_BY_NAME = {
  "Game Jam": "type",
  Prototype: "type",
  Software: "type",

  Godot: "engine",
  Unity: "engine",
  Unreal: "engine",
  React: "tool",

  "FL Studio": "tool",
  Aseprite: "tool",
  Blender: "tool",
  Figma: "tool",
  Git: "tool",

  JavaScript: "language",
  TypeScript: "language",
  Python: "language",
  "C#": "language",
  "C++": "language",
  GDScript: "language",

  Web: "platform",
  Windows: "platform",
  Android: "platform",

  Programmer: "role",
  Designer: "role",

  Puzzle: "genre",
  Platformer: "genre",
  Horror: "genre",

  Completed: "status",
  "In Progress": "status",
};

const TYPE_TAG_PRIORITY = ["Game Jam", "Prototype", "Software"];

function getTypeFromTags(tags) {
  if (!Array.isArray(tags) || tags.length === 0) {
    return "Other";
  } 
  const tagSet = new Set(tags);
  for (const t of TYPE_TAG_PRIORITY) {
    if (tagSet.has(t)) return t;
  }
  
  return "Other";
}

function getTypeClass(type) {
  switch (type) {
    case "Game Jam":
      return styles.typeGameJam;
    case "Prototype":
      return styles.typePrototype;
    case "Software":
      return styles.typeSoftware;
    default:
      return styles.typeOther;
  }
}

function normalizeTag(tag) {
  return String(tag || "").trim();
}

function getTagCategory(tag) {
  const name = normalizeTag(tag);
  return TAG_CATEGORY_BY_NAME[name] || "misc";
}

function getTagClass(tag) {
  const category = getTagCategory(tag);
  return TAG_CATEGORY_CLASS[category] || styles.tagMisc;
}

const ProjectCard = forwardRef(function ProjectCard(
  {
    imgUrl = "",
    title = "",
    description = "",
    tags = [],
    category = "",
    className = "",
    style = undefined,
    onClick = undefined,
    projectLink = "",
  },
  ref ) 
  {
  const type = getTypeFromTags(tags);
  const typeClass = getTypeClass(type);
  
  return (
    <article
      ref={ref}
      className={`${styles.card} ${className}`}
      style={style}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.(e);
      }}
    >
      <div className={`${styles.thumbWrap} ${typeClass}`}>
        <video
          className={styles.thumb}
          src={imgUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          loading="lazy"
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>

        <div className={styles.tags}>
          {tags.map((t) => {
            const name = normalizeTag(t);
            if (!name) return null;

            return (
              <span key={name} className={`${styles.tag} ${getTagClass(name)}`}>
                {name}
              </span>
            );
          })}
        </div>

        <button
          className={styles.cta}
          type="button"
          onClick={(e) => {
            e.stopPropagation(); 
            window.open(projectLink, "_blank", "noopener,noreferrer");
          }}
        >
          VIEW PROJECT
        </button>
      </div>
    </article>
  );
});

ProjectCard.propTypes = {
  imgUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  category: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  link: PropTypes.string,
};

export default ProjectCard;