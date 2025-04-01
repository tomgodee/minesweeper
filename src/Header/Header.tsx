import FlagIcon from "@mui/icons-material/Flag";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import type { Settings } from "../App";
import SettingsComponent from "../Settings";
import "./Header.scss";

interface HeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmSettings: (settings: Settings) => void;
  flagCount: number;
  settings: Settings;
  openTileCount: number;
}

function Header(props: HeaderProps) {
  const { open, setOpen, confirmSettings, flagCount, settings, openTileCount } =
    props;

  const tileCount = settings.width * settings.height;

  return (
    <>
      <Box className="header">
        <Box display="flex" alignItems="center">
          <Typography className="flagCount">{flagCount}</Typography>
          <FlagIcon color="error" />
        </Box>
        <Box sx={{ width: "100%", margin: "0 2rem" }}>
          <LinearProgress
            variant="determinate"
            value={(openTileCount / tileCount) * 100}
          />
        </Box>
        <IconButton onClick={() => setOpen((prevState) => !prevState)}>
          <SettingsIcon color="primary" />
        </IconButton>
      </Box>
      <SettingsComponent
        open={open}
        setOpen={setOpen}
        handleConfirm={confirmSettings}
        settings={settings}
      />
    </>
  );
}

export default Header;
