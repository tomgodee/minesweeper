import { useState } from "react";
import Header from "./Header";
import { Difficulty, Settings } from "../App";

interface HeaderContainerProps {
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

function HeaderContainer(props: HeaderContainerProps) {
  const { setSettings } = props;
  const [open, setOpen] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const handleConfirmDifficulty = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "easy":
        setSettings({
          width: 3,
          height: 3,
          mineCount: 1,
          difficulty: "easy",
        });
        break;
      case "medium":
        setSettings({
          width: 10,
          height: 10,
          mineCount: 8,
          difficulty: "medium",
        });
        break;
      case "hard":
        setSettings({
          width: 14,
          height: 14,
          mineCount: 40,
          difficulty: "hard",
        });
        break;
      case "custom":
        setSettings({
          width: 5,
          height: 5,
          mineCount: 3,
          difficulty: "custom",
        });
        break;
      default:
        //TODO: Make a noti saying smth has gone wrong
        setSettings({
          width: 5,
          height: 5,
          mineCount: 1,
          difficulty: "easy",
        });
    }
  };

  return (
    <Header
      open={open}
      setOpen={setOpen}
      difficulty={difficulty}
      setDifficulty={setDifficulty}
      handleConfirmDifficulty={handleConfirmDifficulty}
    />
  );
}

export default HeaderContainer;
