import { createContext, useContext, useState, useMemo } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [state, setState] = useState({
    gridSolved: false,
    panelLoose: false,
    panelRemoved: false,
    machinePanelRemoved: false,
    cogInserted: false,
    corePowered: false,
    coreInserted: false,
    consoleUnlocked: false,
  });

  const [items, setItems] = useState({
    screwdriver: {
      location: "inventory",
      pos: {x: 200, y: 0},    // for temporary testing
    },

    cog: {
      location: "cogMechanism",
      pos: null,
    },

    core: {
      location: "skillTree",
      pos: null,
      powered: false,
    },
  });

  const updateState = (key, value = true) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateItem = (itemId, updates) => {
    setItems(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        ...updates,
      }
    }));
  };

  // Progress calculation
  const progress = useMemo(() => {
    const steps = [
      state.gridSolved,
      (items.screwdriver.location !== "hidden"),
      (items.cog.location !== "cogMechanism"),
      state.cogInserted && state.coreInserted,
      state.corePowered,
      state.consoleUnlocked,
    ];

    const completed = steps.filter(Boolean).length;
    const total = steps.length;

    return {
      completed,
      total,
      percent: (completed / total) * 100,
    };
  }, [state, items]);

  return (
    <GameContext.Provider value={{ progress, state, updateState, items, updateItem }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}