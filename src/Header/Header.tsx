import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Difficulty } from "../App";

interface HeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  difficulty: Difficulty;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
  handleConfirmDifficulty: (difficulty: Difficulty) => void;
}

function Header(props: HeaderProps) {
  const { open, setOpen, handleConfirmDifficulty, difficulty, setDifficulty } =
    props;

  return (
    <>
      <Box display="flex" justifyContent="flex-end" padding="1rem">
        <IconButton onClick={() => setOpen((prevState) => !prevState)}>
          <SettingsIcon />
        </IconButton>
      </Box>
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        // slots
        // onClose={handleClose}
        // slots={{ transition: <Slide direction="up" /> }}
      >
        <DialogTitle>Choose a difficulty</DialogTitle>
        <DialogContent>
          <RadioGroup
            defaultValue="easy"
            name="radio-buttons-group"
            value={difficulty}
            onChange={(event) => {
              setDifficulty(event.target.value as Difficulty);
            }}
          >
            <FormControlLabel value="easy" control={<Radio />} label="Easy" />
            <FormControlLabel
              value="medium"
              control={<Radio />}
              label="Medium"
            />
            <FormControlLabel value="hard" control={<Radio />} label="Hard" />
            <FormControlLabel
              value="custom"
              control={<Radio />}
              label="Custom"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleConfirmDifficulty(difficulty);
              setOpen(false);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Header;
