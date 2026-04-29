import { createContext, useContext, useState, useMemo } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [state, setState] = useState({
    gridSolved: false,
    panelOpened: false,
    consoleUnlocked: false,

    hasScrewdriver: false,
    hasCog: false,
    hasCore: false,

    coreInserted: false,
    cogInserted: false,
    corePowered: false,
  });

  const updateState = (key, value = true) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Progress calculation
  const progress = useMemo(() => {
    const steps = [
      state.gridSolved,
      state.hasScrewdriver,
      state.panelOpened,
      state.hasCog,
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
  }, [state]);

  return (
    <GameContext.Provider value={{ state, updateState, progress }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}