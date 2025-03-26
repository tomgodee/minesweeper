import Box from "@mui/material/Box";
import "./Tile.scss";
import type { Tile } from "../types";

interface TileProps {
  tile: Tile;
  handleClick: (tile: Tile) => void;
}

function Tile(props: TileProps) {
  const { tile, handleClick } = props;

  if (!tile.open)
    return <Box className="tile" onClick={() => handleClick(tile)}></Box>;
  else
    return (
      <Box className="tile">
        {tile.mineCountSymbol === "bomb" ? "B" : tile.mineCountSymbol}
      </Box>
    );
}

export default Tile;
