import TileComponent from "./Tile";
import type { Tile } from "../types";

interface TileContainerProps {
  tile: Tile;
  handleClick: (tile: Tile) => void;
}

function TileContainer(props: TileContainerProps) {
  const { tile, handleClick } = props;
  return <TileComponent tile={tile} handleClick={handleClick}></TileComponent>;
}

export default TileContainer;
