import { useEffect, useMemo, useRef, useState } from "react";
import { TREE } from "./treeData.js";
import styles from "./SkillsSection.module.css";
import useMediaQuery from "./useMediaQuery.js";
import flattenTree from "./flattenTree.js";
import useSkillTreeLayout from "./useSkillTreeLayout.js";
import useSkillPathHighlight from "./useSkillPathHighlight.js";
import SkillTreeSvg from "./SkillTreeSvg.jsx";
import SkillTooltip from "./SkillTooltip.jsx";
import ScrewContainer from "../Tools/ScrewContainer.jsx";
import { useGame } from "../Context/GameContext.jsx";


function SkillsSection() {
  const { state, items, updateItem } = useGame();

  const isNarrow = useMediaQuery("(max-width: 1100px)");

  const [activeId, setActiveId] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const stageRef = useRef(null);
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const coreRef = useRef(null);

  // Tooltip tracking
  const rafRef = useRef(0);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  const { nodes, edges, parentById } = useMemo(() => flattenTree(TREE), []);
  const { layout, centers, viewW, viewH } = useSkillTreeLayout({ nodes, isNarrow });

  const coreCenter = centers.get("core");
  const [corePos, setCorePos] = useState(null);

  const { isDimNode, isPathEdge } = useSkillPathHighlight({ activeId, parentById });

  const getNodeMeta = (id) => nodes.find((n) => n.id === id) ?? null;

  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  const OBSERVER_ENTRY_THRESHOLD = 0.3;
  const TOOLTIP_MARGIN = 14;    // px
  const TOOLTIP_PADDING = 10;   // px

  const NARROW_TOOLTIP_PADDING = 12;  // px
  const ARROW_GAP = 16;               // px

  useEffect(() => {             // update core position
    if (!coreCenter) return;

    const update = () => {
      setCorePos(
        svgToStageXY(coreCenter.x, coreCenter.y)
      );
    };
    update();
    window.addEventListener("resize", update);
    
    return () => {
      window.removeEventListener("resize", update);
    };

  }, [coreCenter, viewW, viewH]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: OBSERVER_ENTRY_THRESHOLD }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const depthById = useMemo(() => {
    const map = new Map();

    nodes.forEach((n) => {
      let depth = 0;
      let cur = n.id;

      while (parentById.get(cur)) {
        depth++;
        cur = parentById.get(cur);
      }

      map.set(n.id, depth);
    });

    return map;
  }, [nodes, parentById]);

  const svgToStageXY = (x, y) => {
    const stageEl = stageRef.current;
    const svgEl = svgRef.current;
    if (!stageEl || !svgEl) return { left: 0, top: 0 };

    const stageRect = stageEl.getBoundingClientRect();
    const svgRect = svgEl.getBoundingClientRect();

    const scaleX = svgRect.width / viewW;
    const scaleY = svgRect.height / viewH;

    const screenX = svgRect.left + x * scaleX;
    const screenY = svgRect.top + y * scaleY;

    return {
      left: screenX - stageRect.left,
      top: screenY - stageRect.top,
    };
  };

  const clientToStageXY = (clientX, clientY) => {
    const stageEl = stageRef.current;
    if (!stageEl) return { left: 0, top: 0 };

    const stageRect = stageEl.getBoundingClientRect();
    return {
      left: clientX - stageRect.left,
      top: clientY - stageRect.top,
    };
  };

  // Position tooltip near cursor and flip/clamp
  const positionTooltipAtClient = (clientX, clientY) => {
    const stageEl = stageRef.current;
    const tipEl = tooltipRef.current;
    if (!stageEl || !tipEl) return;

    const stageRect = stageEl.getBoundingClientRect();
    const tipRect = tipEl.getBoundingClientRect();

    let { left: x, top: y } = clientToStageXY(clientX, clientY);

    const spaceRight = stageRect.right - clientX;
    const spaceBottom = stageRect.bottom - clientY;

    const ox = spaceRight < tipRect.width + TOOLTIP_MARGIN ? -(tipRect.width + TOOLTIP_MARGIN) : TOOLTIP_MARGIN;
    const oy = spaceBottom < tipRect.height + TOOLTIP_MARGIN ? -(tipRect.height + TOOLTIP_MARGIN) : TOOLTIP_MARGIN;

    tipEl.style.setProperty("--ox", `${ox}px`);
    tipEl.style.setProperty("--oy", `${oy}px`);

    tipEl.style.left = `${x}px`;
    tipEl.style.top = `${y}px`;

    const afterRect = tipEl.getBoundingClientRect();

    let nudgeX = 0;
    let nudgeY = 0;

    if (afterRect.right > stageRect.right) nudgeX -= (afterRect.right - stageRect.right) + TOOLTIP_PADDING;
    if (afterRect.left < stageRect.left) nudgeX += (stageRect.left - afterRect.left) + TOOLTIP_PADDING;

    if (afterRect.bottom > stageRect.bottom) nudgeY -= (afterRect.bottom - stageRect.bottom) + TOOLTIP_PADDING;
    if (afterRect.top < stageRect.top) nudgeY += (stageRect.top - afterRect.top) + TOOLTIP_PADDING;

    if (nudgeX !== 0) tipEl.style.left = `${x + nudgeX}px`;
    if (nudgeY !== 0) tipEl.style.top = `${y + nudgeY}px`;
  };

  const scheduleTooltipTrack = (clientX, clientY) => {
    lastPointerRef.current = { x: clientX, y: clientY };
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const { x, y } = lastPointerRef.current;
      positionTooltipAtClient(x, y);
    });
  };

  // Narrow: clamp & flip tooltip
  const positionTooltipNarrow = (id) => {
    const stageEl = stageRef.current;
    const tipEl = tooltipRef.current;
    const c = centers.get(id);

    if (!stageEl || !tipEl || !c) return;

    const stageRect = stageEl.getBoundingClientRect();
    const tipRect = tipEl.getBoundingClientRect();

    // Base position (centered on node)
    const base = svgToStageXY(c.x, c.y);

    let left = base.left;
    let top = base.top;

    // For Horizontal Space
    const halfW = tipRect.width / 2;

    if (left - halfW < NARROW_TOOLTIP_PADDING) {
      left = halfW + NARROW_TOOLTIP_PADDING;
    }

    if (left + halfW > stageRect.width - NARROW_TOOLTIP_PADDING) {
      left = stageRect.width - halfW - NARROW_TOOLTIP_PADDING;
    }

    // For Vertical space
    const aboveTop = top - tipRect.height - ARROW_GAP;

    if (aboveTop < NARROW_TOOLTIP_PADDING) {
      tipEl.classList.add(styles.tooltipBelow);
    } else {
      tipEl.classList.remove(styles.tooltipBelow);
    }

    tipEl.style.left = `${left}px`;
    tipEl.style.top = `${top}px`;
  };

  const showTooltipFor = (id, evt) => {
    const meta = getNodeMeta(id);
    const title = meta?.label ?? id;
    const desc = meta?.desc ?? "";

    // Desktop: show near cursor
    if (!isNarrow && evt?.clientX != null && evt?.clientY != null) {
      setTooltip({ id, title, desc });
      requestAnimationFrame(() => scheduleTooltipTrack(evt.clientX, evt.clientY));
      return;
    }

    // Narrow: anchor to node
    const c = centers.get(id);
    if (!c) return;

    const pos = svgToStageXY(c.x, c.y);
    setTooltip({ id, title, desc, x: pos.left, y: pos.top });
    requestAnimationFrame(() => { positionTooltipNarrow(id) });
  };

  const hideTooltip = () => setTooltip(null);

  const onEnter = (id, evt) => {
    setActiveId(id);
    if (!isNarrow) showTooltipFor(id, evt);
  };

  const onLeave = () => {
    setActiveId(null);
    hideTooltip();
  };

  const onTap = (id) => {
    if (!isNarrow) return;

    setActiveId(id);
    setTooltip((prev) => (prev?.id === id ? null : prev));
    showTooltipFor(id);
  };

  // Desktop tracking while tooltip open
  useEffect(() => {
    if (isNarrow) return;
    if (!tooltip?.id) return;

    const stageEl = stageRef.current;
    if (!stageEl) return;

    const onMove = (e) => {
      if (!tooltipRef.current) return;
      scheduleTooltipTrack(e.clientX, e.clientY);
    };

    stageEl.addEventListener("pointermove", onMove);
    return () => stageEl.removeEventListener("pointermove", onMove);
  }, [isNarrow, tooltip?.id]);

  // Narrow: click outside closes
  useEffect(() => {
    if (!isNarrow) return;

    const onDocDown = (e) => {
      const stageEl = stageRef.current;
      if (!stageEl) return;

      if (tooltip && !stageEl.contains(e.target)) {
        setActiveId(null);
        hideTooltip();
      }
    };

    document.addEventListener("pointerdown", onDocDown);
    return () => document.removeEventListener("pointerdown", onDocDown);
  }, [isNarrow, tooltip]);

  // Reposition on resize
  useEffect(() => {
    if (!tooltip?.id) return;

    const onResize = () => {
      if (!isNarrow) {
        const { x, y } = lastPointerRef.current;
        if (x && y) scheduleTooltipTrack(x, y);
      } else {
        const c = centers.get(tooltip.id);
        if (!c) return;
        const pos = svgToStageXY(c.x, c.y);
        setTooltip((t) => (t ? { ...t, x: pos.left, y: pos.top } : t));
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [tooltip?.id, isNarrow, centers]);

  return (
    <div ref={sectionRef} className={styles.skillsSection}>
      <div className={styles.heading}>
        <h1>My Skill Tree</h1>
        <p>Levelling Up <span className="hl2">My Expertise</span> Everyday</p>
      </div>

      <div
        className={styles.stage}
        ref={stageRef}
        onClick={() => {
          if (isNarrow) {
            setActiveId(null);
            hideTooltip();
          }
        }}
      >
        <SkillTreeSvg
          nodes={nodes}
          edges={edges}
          centers={centers}
          layout={layout}
          viewW={viewW}
          viewH={viewH}
          isNarrow={isNarrow}
          activeId={activeId}
          isDimNode={isDimNode}
          isPathEdge={isPathEdge}
          onEnter={onEnter}
          onLeave={onLeave}
          onTap={onTap}
          svgRef={svgRef}
          revealed={revealed}
          depthById={depthById}
        />

        {corePos && items.core.location === "skillTree" && (
          <div className={styles.overlayLayer}>

            <div
              className={styles.coreOverlay}
              style={{
                left: `${corePos.left}px`,
                top: `${corePos.top}px`,
              }}
            >

              <ScrewContainer
                enabled={true}
                screwArray={[
                  { id: 1, x: 0.4, y: 0.4 },
                ]}
                onComplete={() => {

                  const rect = coreRef.current?.getBoundingClientRect();
                  if (!rect) return;

                  updateItem("core", {
                    location: "inventory",
                    pos: {
                      x: rect.left,
                      y: rect.top,
                    }
                  });
                }}
              >
                <div
                  ref={coreRef}
                  className={styles.coreHitbox}
                />

              </ScrewContainer>

            </div>

          </div>
        )}

        <SkillTooltip
          tooltip={tooltip}
          isNarrow={isNarrow}
          onClick={(e) => e.stopPropagation()}
          tooltipRef={tooltipRef}
        />
      </div>
    </div>
  );
}

export default SkillsSection