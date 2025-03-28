import { Tile } from "../types";
import FieldLine from "./FieldLine";

interface FieldLineContainerProps {
  line: Tile[];
  handleClickTile: (tile: Tile) => void;
  handleRightClickTile: (tile: Tile) => void;
}

function FieldLineContainer(props: FieldLineContainerProps) {
  const { line, handleClickTile, handleRightClickTile } = props;
  return (
    <FieldLine
      line={line}
      handleClickTile={handleClickTile}
      handleRightClickTile={handleRightClickTile}
    />
  );
}

export default FieldLineContainer;
