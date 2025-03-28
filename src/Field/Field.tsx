import Box from "@mui/material/Box";
import FieldLine from "../FieldLine";
import { Tile } from "../types";
import "./Field.scss";

interface FieldProps {
  plot: Tile[][];
  handleClickTile: (tile: Tile) => void;
  handleRightClickTile: (tile: Tile) => void;
}

function Field(props: FieldProps) {
  const { plot, handleClickTile, handleRightClickTile } = props;
  return (
    <Box className="field">
      {plot.map((line, index) => {
        return (
          <FieldLine
            line={line}
            key={index}
            handleClickTile={handleClickTile}
            handleRightClickTile={handleRightClickTile}
          />
        );
      })}
    </Box>
  );
}

export default Field;
