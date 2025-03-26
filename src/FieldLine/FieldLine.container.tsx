import { Tile } from "../types";
import FieldLine from "./FieldLine";

interface FieldLineContainerProps {
  line: Tile[];
  handleClickTile: (tile: Tile) => void;
}

function FieldLineContainer(props: FieldLineContainerProps) {
  const { line, handleClickTile } = props;
  return <FieldLine line={line} handleClickTile={handleClickTile} />;
}

export default FieldLineContainer;
