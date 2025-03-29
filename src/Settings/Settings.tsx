import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import type { Settings } from "../App";
import { Difficulty } from "../App";

interface SettingsProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  difficulty: Difficulty;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
  handleConfirm: (difficulty: Difficulty) => void;
  settings: Settings;
}

function Settings(props: SettingsProps) {
  const { open, setOpen, handleConfirm, difficulty, setDifficulty, settings } =
    props;

  return (
    <Dialog open={open}>
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
          <FormControlLabel value="medium" control={<Radio />} label="Medium" />
          <FormControlLabel value="hard" control={<Radio />} label="Hard" />
          <FormControlLabel value="custom" control={<Radio />} label="Custom" />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setDifficulty(settings.difficulty);
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleConfirm(difficulty);
            setOpen(false);
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Settings;
