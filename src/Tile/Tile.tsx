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
    return (
      <Box
        className={`tile close ${
          (tile.line + tile.column) % 2 === 0 ? "even" : "odd"
        }`}
        onClick={() => handleClick(tile)}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      ></Box>
    );
  else
    return (
      <Box
        className={`tile open ${
          (tile.line + tile.column) % 2 === 0 ? "even" : "odd"
        }`}
      >
        {tile.mineCountSymbol === "bomb" ? "B" : tile.mineCountSymbol}
      </Box>
    );
}

export default Tile;
