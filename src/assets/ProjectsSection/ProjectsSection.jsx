import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowLeft} from "@fortawesome/free-solid-svg-icons"
import ProjectCard from "../ProjectCard/ProjectCard.jsx"
import profilePic from "../ElectroCubicLogo_New.png"
import styles from "./ProjectsSection.module.css"
import { PROJECTS } from "./projectsData.js"

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function getWindowCircular(list, start, k) {
  const out = [];
  const n = list.length;
  for (let i = 0; i < k; i++) {
    out.push(list[(start + i) % n]);
  }
  return out;
}

function ProjectsSection() {
  const projects = PROJECTS;

  const sectionRef = useRef(null);
  const deckRef = useRef(null);
  const carouselRef = useRef(null);

  const cardRefs = useRef([]);
  const raf1 = useRef(0);
  const raf2 = useRef(0);
  const settleTimeoutRef = useRef(null);

  const [triggered, setTriggered] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [poppedId, setPoppedId] = useState(null);

  const [shuffledProjects, setShuffledProjects] = useState(() => projects);

  const [cardsPerPage, setCardsPerPage] = useState(1);
  const [pageStart, setPageStart] = useState(0);
  const [wobblePhaseById, setWobblePhaseById] = useState(() => new Map());
  const [category, setCategory] = useState("Featured");

  const deckCenter = useRef({ x: 0, y: 0 });

  const dealDelay = 140;

  const tapDeck = () => {
    const el = deckRef.current;
    if (!el) return;

    el.classList.remove(styles.deckTap);
    void el.offsetWidth;
    el.classList.add(styles.deckTap);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const shuffled = shuffleArray(projects);
        setShuffledProjects(shuffled);

        const duration = 4.5;
        const m = new Map();
        shuffled.forEach((p) =>
          m.set(p.id, `-${(Math.random() * duration).toFixed(3)}s`)
        );
        setWobblePhaseById(m);

        setTriggered(true);
        setPhase("prep");
        setPageStart(0);
        setPoppedId(null);

        io.disconnect();
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (category === "All") {
      return shuffledProjects;
    }
    return shuffledProjects.filter((p) => p.category === category);
  }, [shuffledProjects, category]);

  useEffect(() => {
    setPageStart(0);
    setPoppedId(null);
  }, [category]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const arrowW = 44; // CSS value
    const gap = 5;
    const minCardWidth = 255;
    const maxCards = 5;

    const ro = new ResizeObserver(([entry]) => {
      const fullW = entry.contentRect.width;
      const cardsAreaW = Math.max(0, fullW - (arrowW * 2 + gap * 2));
      const raw = Math.floor((cardsAreaW + gap) / (minCardWidth + gap));
      const k = clamp(raw || 1, 1, maxCards);

      setCardsPerPage(k);

      setPageStart((s) => {
        const n = filteredProjects.length || 1;
        const snapped = Math.floor(s / k) * k;
        return ((snapped % n) + n) % n;
      });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [filteredProjects.length]);

  const visible = useMemo(() => {
    const n = filteredProjects.length;
    if (n === 0) return [];
    const k = Math.min(cardsPerPage, n);
    return getWindowCircular(filteredProjects, pageStart, k);
  }, [filteredProjects, pageStart, cardsPerPage]);

  // Calculate deck center pos
  useLayoutEffect(() => {
    const deckEl = deckRef.current;
    if (!deckEl) return;

    const rect = deckEl.getBoundingClientRect();
    deckCenter.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }, []);

  const setOffsets = (cardEl) => {
    if (!cardEl) return;

    const card = cardEl.getBoundingClientRect();

    const dx = deckCenter.current.x - (card.left + card.width / 2);
    const dy = deckCenter.current.y - (card.top + card.height / 2);

    cardEl.style.setProperty("--deal-x", `${dx}px`);
    cardEl.style.setProperty("--deal-y", `${dy}px`);
  };

  const scheduleSettle = () => {
    if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);

    const k = visible.length || 1;
    const total = 440 + (k - 1) * 140 + 80;

    settleTimeoutRef.current = setTimeout(() => setPhase("settled"), total);
  };

  useLayoutEffect(() => {
    if (!triggered) return;
    if (!visible.length) return;

    setPhase("prep");

    raf1.current = requestAnimationFrame(() => {
      const deckEl = deckRef.current;
      if (deckEl) {
        const rect = deckEl.getBoundingClientRect();
        deckCenter.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      }

      visible.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (el) setOffsets(el);
      });

      raf2.current = requestAnimationFrame(() => {
        setPhase("dealing");
        scheduleSettle();
      });
    });

    return () => {
      cancelAnimationFrame(raf1.current);
      cancelAnimationFrame(raf2.current);
      if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
    };
  }, [triggered, pageStart, cardsPerPage, visible.length]);


  const prev = () => {
    tapDeck();
    setPoppedId(null);
    setPageStart((s) => {
      const n = filteredProjects.length || 1;
      const k = Math.min(cardsPerPage, n);
      return (s - k + n) % n;
    });
  };

  const next = () => {
    tapDeck();
    setPoppedId(null);
    setPageStart((s) => {
      const n = filteredProjects.length || 1;
      const k = Math.min(cardsPerPage, n);
      return (s + k) % n;
    });
  };

  const onCardTap = (id) => {
    setPoppedId((cur) => (cur === id ? null : id));
  };

  const phaseClass =
    phase === "prep"
      ? styles.prep
      : phase === "dealing"
      ? styles.dealing
      : phase === "settled"
      ? styles.settled
      : "";

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={styles.projectsSection}
      onClick={() => setPoppedId(null)}
    >
      <div className={styles.headingBar}>
        <h1 className={styles.heading}>Explore My Worlds</h1>
        <p className={styles.subheading}>
          The <span className="hl">Cool Stuff</span> I've Worked Upon
        </p>
      </div>

      <div className={styles.tabs}>
        {["All", "Featured", "Prototypes", "Other"].map((tab) => (
          <button
            key={tab}
            className={`${styles.tabBtn} ${
              category === tab ? styles.activeTab : ""
            }`}
            onClick={() => setCategory(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.cardsViewport}>
        <div ref={carouselRef} className={styles.carousel}>
          <button
            type="button"
            className={styles.arrow}
            onClick={prev}
            aria-label="Previous projects"
            disabled={!triggered || filteredProjects.length <= 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
          </button>

          <div
            className={styles.cardsRow}
            style={{ "--cols": visible.length }}
          >
            {visible.map((p, i) => (
              <ProjectCard
                key={`${p.id}-${pageStart}`}
                ref={(el) => (cardRefs.current[i] = el)}
                imgUrl={p.img}
                title={p.title}
                description={p.description}
                altDesc={p.alt}
                tags={p.tags}
                projectLink={p.projectLink}
                isActive={poppedId === p.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onCardTap(p.id);
                }}
                className={[
                  styles.dealCard,
                  phaseClass,
                  poppedId === p.id ? styles.popped : "",
                ].join(" ")}
                style={{
                  "--deal-delay": `${i * dealDelay}ms`,
                  "--wobble-phase": wobblePhaseById.get(p.id) ?? "0s",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.arrow}
            onClick={next}
            aria-label="Next projects"
            disabled={!triggered || filteredProjects.length <= 1}
          >
            <FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
          </button>
        </div>

        <div
          ref={deckRef}
          className={styles.deck}
          onClick={tapDeck}
          aria-hidden="true"
        >
          <img src={profilePic} alt="ElectroCubic Logo" />
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
