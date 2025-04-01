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
import type { Settings } from "../App";
import { Difficulty } from "../App";
import "./Settings.scss";
import { useState } from "react";

interface SettingsProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  difficulty: Difficulty;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
  handleConfirm: (settings: Settings) => void;
  settings: Settings;
}

const easySettings: Settings = {
  width: 3,
  height: 4,
  mineCount: 3,
  difficulty: "easy",
};
const mediumSettings: Settings = {
  width: 10,
  height: 10,
  mineCount: 8,
  difficulty: "medium",
};
const hardSettings: Settings = {
  width: 14,
  height: 14,
  mineCount: 40,
  difficulty: "hard",
};

// TODO: Unit test needed
const isDigit = (text: string) => text.match(/^\d+$/);

function Settings(props: SettingsProps) {
  const { open, setOpen, handleConfirm, difficulty, setDifficulty, settings } =
    props;

  const [customSettingsForm, setCustomSettingForm] = useState({
    width: 10,
    height: 10,
    mineCount: 10,
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
      // TODO: Randomize this option
      case "surprise me":
        handleConfirm({
          width: 5,
          height: 5,
          mineCount: 5,
          difficulty: "surprise me",
        });
        break;
      default:
        //TODO: Make a noti saying smth has gone wrong
        handleConfirm(easySettings);
    }
  };

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
              value="surprise"
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
                customSettingsForm.width > 30
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
                customSettingsForm.height > 30
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
                  (customSettingsForm.height * customSettingsForm.width) / 3
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
