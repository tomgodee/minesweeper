import "./App.css";

import { Box } from "@mui/material";
import { useState } from "react";
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
