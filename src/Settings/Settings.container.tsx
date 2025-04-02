import { useState } from "react";
import type { Difficulty, Settings } from "../types";
import SettingsComponent from "./Settings";
import {
  customSettings,
  easySettings,
  hardSettings,
  mediumSettings,
} from "./Settings.constant";
import { getRandomInt, getRandomRange, isDigit } from "./Settings.methods";

interface SettingsContainerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirm: (settings: Settings) => void;
  settings: Settings;
}

function SettingsContainer(props: SettingsContainerProps) {
  const { open, setOpen, handleConfirm, settings } = props;

  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [customSettingsForm, setCustomSettingForm] = useState({
    width: customSettings.width,
    height: customSettings.height,
    mineCount: customSettings.mineCount,
  });

  const handleFormChanged = ({
    type,
    value,
  }: {
    type: "width" | "height" | "mineCount";
    value: string;
  }) => {
    if (isDigit(value) || value === "") {
      const newValue = value === "" ? 0 : Number(value);

      setCustomSettingForm({
        width: type === "width" ? newValue : customSettingsForm.width,
        height: type === "height" ? newValue : customSettingsForm.height,
        mineCount:
          type === "mineCount" ? newValue : customSettingsForm.mineCount,
      });
    }
  };

  const confirmDialog = () => {
    switch (difficulty) {
      case "easy":
        handleConfirm(easySettings);
        break;
      case "medium":
        handleConfirm(mediumSettings);
        break;
      case "hard":
        handleConfirm(hardSettings);
        break;
      case "custom":
        handleConfirm({
          difficulty: "custom",
          ...customSettingsForm,
        });
        break;
      case "surprise me": {
        const width = getRandomInt(4, 30);
        const height = getRandomInt(4, 30);
        handleConfirm({
          width,
          height,
          mineCount: Math.round(getRandomRange(0.1, 0.4) * width * height),
          difficulty: "surprise me",
        });
        break;
      }
    }
  };

  return (
    <SettingsComponent
      open={open}
      setOpen={setOpen}
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      settings={settings}
      customSettingsForm={customSettingsForm}
      handleFormChanged={handleFormChanged}
      confirmDialog={confirmDialog}
    />
  );
}

export default SettingsContainer;
