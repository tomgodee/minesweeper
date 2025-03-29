import { useState } from "react";
import type { Settings } from "../App";
import { Difficulty } from "../App";
import SettingsComponent from "./Settings";

interface SettingsContainerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirm: (difficulty: Difficulty) => void;
  settings: Settings;
}

function SettingsContainer(props: SettingsContainerProps) {
  const { open, setOpen, handleConfirm, settings } = props;

  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  return (
    <SettingsComponent
      open={open}
      setOpen={setOpen}
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      handleConfirm={handleConfirm}
      settings={settings}
    />
  );
}

export default SettingsContainer;
