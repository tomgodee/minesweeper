import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
// import DialogContentText from "@mui/material/DialogContentText";
import FlagIcon from "@mui/icons-material/Flag";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import type { Settings } from "../App";
import { Difficulty } from "../App";
import SettingsComponent from "../Settings";
import "./Header.scss";

interface HeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmDifficulty: (difficulty: Difficulty) => void;
  flagCount: number;
  settings: Settings;
}

function Header(props: HeaderProps) {
  const { open, setOpen, confirmDifficulty, flagCount, settings } = props;

  return (
    <>
      <Box className="header">
        <Box display="flex">
          <Typography>{flagCount}</Typography>
          <FlagIcon color="error" />
        </Box>
        <IconButton onClick={() => setOpen((prevState) => !prevState)}>
          <SettingsIcon color="primary" />
        </IconButton>
      </Box>
      <SettingsComponent
        open={open}
        setOpen={setOpen}
        handleConfirm={confirmDifficulty}
        settings={settings}
      />
    </>
  );
}

export default Header;
