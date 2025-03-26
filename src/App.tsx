import "./App.css";

import { Box } from "@mui/material";
import { useState } from "react";
import Field from "./Field";
import Header from "./Header";

export type Difficulty = "easy" | "medium" | "hard" | "custom";
export interface Settings {
  width: number;
  height: number;
  mineCount: number;
  difficulty: Difficulty;
}

function App() {
  const [settings, setSettings] = useState<Settings>({
    width: 3,
    height: 3,
    mineCount: 1,
    difficulty: "easy",
  });
  return (
    <>
      <Box>
        <Header setSettings={setSettings} />
        <Field settings={settings} />
      </Box>
    </>
  );
}

export default App;
