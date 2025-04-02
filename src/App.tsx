import "./App.css";

import { Box } from "@mui/material";
import { useState } from "react";
import Field from "./Field";
import Header from "./Header";

export type Difficulty = "easy" | "medium" | "hard" | "custom" | "surprise me";

export interface Settings {
  width: number;
  height: number;
  mineCount: number;
  difficulty: Difficulty;
}

export type GameState = "starting" | "in progress" | "lost" | "won";

function App() {
  const [settings, setSettings] = useState<Settings>({
    width: 3,
    height: 4,
    mineCount: 1,
    difficulty: "easy",
  });
  const [flagCount, setFlagCount] = useState<number>(settings.mineCount);
  const [openTileCount, setOpenTileCount] = useState<number>(
    settings.width * settings.height
  );
  const [gameState, setGameState] = useState<GameState>("starting");

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
          openTileCount={openTileCount}
          setOpenTileCount={setOpenTileCount}
          gameState={gameState}
          setGameState={setGameState}
        />
      </Box>
    </>
  );
}

export default App;
