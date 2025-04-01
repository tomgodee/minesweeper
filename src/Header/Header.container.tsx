import { useState } from "react";
import type { Settings } from "../App";
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

  const confirmSettings = (settings: Settings) => {
    setSettings(settings);
    setFlagCount(settings.mineCount);
  };

  return (
    <Header
      open={open}
      setOpen={setOpen}
      confirmSettings={confirmSettings}
      flagCount={flagCount}
      settings={settings}
    />
  );
}

export default HeaderContainer;
