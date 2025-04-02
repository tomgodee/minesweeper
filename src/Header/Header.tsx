import FlagIcon from "@mui/icons-material/Flag";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import type { GameState } from "../App";
import SettingsComponent from "../Settings";
import type { Settings } from "../types";
import "./Header.scss";

interface HeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmSettings: (settings: Settings) => void;
  flagCount: number;
  settings: Settings;
  openTileCount: number;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

function Header(props: HeaderProps) {
  const {
    open,
    setOpen,
    confirmSettings,
    flagCount,
    settings,
    openTileCount,
    gameState,
    setGameState,
  } = props;

  const tileCount = settings.width * settings.height;

  return (
    <>
      <Box className="header">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Typography className="flagCount">{flagCount}</Typography>
            <FlagIcon color="error" />
          </Box>
          <IconButton
            disabled={gameState !== "lost" && gameState !== "won"}
            onClick={() => {
              setGameState("starting");
            }}
          >
            <RestartAltIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => setOpen((prevState) => !prevState)}>
            <SettingsIcon color="primary" />
          </IconButton>
        </Box>

        {import.meta.env.DEV && <Box textAlign="center">{gameState}</Box>}

        <Box sx={{ width: "100%", marginTop: "1rem" }}>
          <LinearProgress
            variant="determinate"
            value={(openTileCount / (tileCount - settings.mineCount)) * 100}
          />
        </Box>
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
