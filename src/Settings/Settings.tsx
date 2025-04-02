import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import type { Difficulty, Settings } from "../types";
import { isDigit } from "./Settings.methods";
import "./Settings.scss";

interface SettingsProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  difficulty: Difficulty;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
  settings: Settings;
  customSettingsForm: {
    width: number;
    height: number;
    mineCount: number;
  };
  handleFormChanged: ({
    type,
    value,
  }: {
    type: "width" | "height" | "mineCount";
    value: string;
  }) => void;
  confirmDialog: () => void;
}

function Settings(props: SettingsProps) {
  const {
    open,
    setOpen,
    difficulty,
    setDifficulty,
    settings,
    customSettingsForm,
    handleFormChanged,
    confirmDialog,
  } = props;

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>Choose a difficulty</DialogTitle>
      <DialogContent sx={{ display: "flex" }}>
        <FormControl>
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
              value={"medium"}
              control={<Radio />}
              label="Medium"
            />
            <FormControlLabel value="hard" control={<Radio />} label="Hard" />
            <FormControlLabel
              value="custom"
              control={<Radio />}
              label="Custom"
            />
            <FormControlLabel
              value="surprise me"
              control={<Radio />}
              label="Surprise me!"
            />
          </RadioGroup>
        </FormControl>
        {difficulty === "custom" && (
          <Box className="form">
            <TextField
              className="input"
              id="width"
              label="Width"
              variant="outlined"
              error={
                !isDigit(String(customSettingsForm.width)) ||
                customSettingsForm.width > 30 ||
                customSettingsForm.width < 4
              }
              value={customSettingsForm.width}
              onChange={(event) =>
                handleFormChanged({
                  type: "width",
                  value: event.target.value,
                })
              }
            />
            <TextField
              className="input"
              id="height"
              label="Height"
              variant="outlined"
              error={
                !isDigit(String(customSettingsForm.height)) ||
                customSettingsForm.height > 30 ||
                customSettingsForm.height < 4
              }
              value={customSettingsForm.height}
              onChange={(event) =>
                handleFormChanged({
                  type: "height",
                  value: event.target.value,
                })
              }
            />
            <TextField
              className="input"
              id="mineCount"
              label="Mine"
              variant="outlined"
              error={
                !isDigit(String(customSettingsForm.mineCount)) ||
                customSettingsForm.mineCount >
                  (customSettingsForm.height * customSettingsForm.width) / 3 ||
                customSettingsForm.mineCount < 1
              }
              value={customSettingsForm.mineCount}
              onChange={(event) =>
                handleFormChanged({
                  type: "mineCount",
                  value: event.target.value,
                })
              }
            />
          </Box>
        )}
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
            confirmDialog();
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
