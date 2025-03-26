import Box from "@mui/material/Box";
import TileComponent from "../Tile";
import type { Tile } from "../types";
import "./FieldLine.scss";

interface FieldLineProps {
  line: Tile[];
  handleClickTile: (tile: Tile) => void;
}

function FieldLine(props: FieldLineProps) {
  const { line, handleClickTile } = props;
  return (
    <Box className="fieldLine">
      {line.map((item) => {
        return (
          <TileComponent
            tile={item}
            key={`${item.column}_${item.line}`}
            handleClick={handleClickTile}
          />
        );
      })}
    </Box>
  );
}

export default FieldLine;
