import TileComponent from "./Tile";
import type { Tile } from "../types";

interface TileContainerProps {
  tile: Tile;
  handleClick: (tile: Tile) => void;
  handleRightClickTile: (tile: Tile) => void;
}

function TileContainer(props: TileContainerProps) {
  const { tile, handleClick, handleRightClickTile } = props;
  return (
    <TileComponent
      tile={tile}
      handleClick={handleClick}
      handleRightClickTile={handleRightClickTile}
    ></TileComponent>
  );
}

export default TileContainer;
