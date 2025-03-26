import Box from "@mui/material/Box";
import FieldLine from "../FieldLine";
import { Tile } from "../types";
import "./Field.scss";

interface FieldProps {
  plot: Tile[][];
  handleClickTile: (tile: Tile) => void;
}

function Field(props: FieldProps) {
  const { plot, handleClickTile } = props;
  return (
    <Box className="field">
      {plot.map((line, index) => {
        return (
          <FieldLine
            line={line}
            key={index}
            handleClickTile={handleClickTile}
          />
        );
      })}
    </Box>
  );
}

export default Field;
