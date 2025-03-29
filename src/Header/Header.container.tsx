import { useState } from "react";
import { Difficulty, Settings } from "../App";
import Header from "./Header";

interface HeaderContainerProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  flagCount: number;
  setFlagCount: React.Dispatch<React.SetStateAction<number>>;
}

function HeaderContainer(props: HeaderContainerProps) {
  const { setSettings, flagCount, settings, setFlagCount } = props;
  const [open, setOpen] = useState(false);

  const confirmDifficulty = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "easy":
        setSettings({
          width: 3,
          height: 4,
          mineCount: 3,
          difficulty: "easy",
        });
        setFlagCount(3);
        break;
      case "medium":
        setSettings({
          width: 10,
          height: 10,
          mineCount: 8,
          difficulty: "medium",
        });
        setFlagCount(8);
        break;
      case "hard":
        setSettings({
          width: 14,
          height: 14,
          mineCount: 40,
          difficulty: "hard",
        });
        setFlagCount(40);
        break;
      case "custom":
        setSettings({
          width: 5,
          height: 5,
          mineCount: 3,
          difficulty: "custom",
        });
        setFlagCount(3);
        break;
      default:
        //TODO: Make a noti saying smth has gone wrong
        setSettings({
          width: 5,
          height: 5,
          mineCount: 1,
          difficulty: "easy",
        });
        setFlagCount(1);
    }
  };

  return (
    <Header
      open={open}
      setOpen={setOpen}
      confirmDifficulty={confirmDifficulty}
      flagCount={flagCount}
      settings={settings}
    />
  );
}

export default HeaderContainer;
