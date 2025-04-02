import "./App.css";

import { Box } from "@mui/material";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import Field from "./Field";
import Header from "./Header";
import { easySettings } from "./Settings/Settings.constant";
import { Settings } from "./types/settings";

export type GameState = "starting" | "in progress" | "lost" | "won";

function App() {
  const [settings, setSettings] = useState<Settings>(easySettings);
  const [flagCount, setFlagCount] = useState<number>(settings.mineCount);
  const [openTileCount, setOpenTileCount] = useState<number>(
    settings.width * settings.height
  );
  const [gameState, setGameState] = useState<GameState>("starting");

  useEffect(() => {
    const options = { particleCount: 100, drift: -2 };
    if (gameState === "won") {
      confetti(options);
      setTimeout(() => {
        confetti({ ...options, drift: 2 });
      }, 1000);
      setTimeout(() => {
        confetti({ ...options, drift: -1 });
      }, 2000);
      setTimeout(() => {
        confetti({ ...options, drift: 1 });
      }, 3000);
      setTimeout(() => {
        confetti({ ...options, drift: 0 });
      }, 4000);
    }
  }, [gameState]);

  return (
    <>
      <Box>
        <Header
          settings={settings}
          setSettings={setSettings}
          flagCount={flagCount}
          setFlagCount={setFlagCount}
          openTileCount={openTileCount}
          gameState={gameState}
          setGameState={setGameState}
        />
        <Field
          settings={settings}
          setFlagCount={setFlagCount}
          setOpenTileCount={setOpenTileCount}
          gameState={gameState}
          setGameState={setGameState}
        />
      </Box>
    </>
  );
}

export default App;
