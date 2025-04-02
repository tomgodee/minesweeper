import { useState } from "react";
import type { GameState } from "../App";
import Header from "./Header";
import { Settings } from "../types";

interface HeaderContainerProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  flagCount: number;
  setFlagCount: React.Dispatch<React.SetStateAction<number>>;
  openTileCount: number;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

function HeaderContainer(props: HeaderContainerProps) {
  const {
    setSettings,
    flagCount,
    settings,
    setFlagCount,
    openTileCount,
    gameState,
    setGameState,
  } = props;
  const [open, setOpen] = useState(false);

  const confirmSettings = (settings: Settings) => {
    setSettings(settings);
    setFlagCount(settings.mineCount);
    setGameState("starting");
  };

  return (
    <Header
      open={open}
      setOpen={setOpen}
      confirmSettings={confirmSettings}
      flagCount={flagCount}
      settings={settings}
      openTileCount={openTileCount}
      gameState={gameState}
      setGameState={setGameState}
    />
  );
}

export default HeaderContainer;
