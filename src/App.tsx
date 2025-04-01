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

function App() {
  const [settings, setSettings] = useState<Settings>({
    width: 3,
    height: 4,
    mineCount: 3,
    difficulty: "easy",
  });
  const [flagCount, setFlagCount] = useState<number>(settings.mineCount);

  return (
    <>
      <Box>
        <Header
          settings={settings}
          setSettings={setSettings}
          flagCount={flagCount}
          setFlagCount={setFlagCount}
        />
        <Field settings={settings} setFlagCount={setFlagCount} />
      </Box>
    </>
  );
}

export default App;
