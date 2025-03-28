import Box from "@mui/material/Box";
import "./Tile.scss";
import type { Tile } from "../types";
import FlagIcon from "@mui/icons-material/Flag";

interface TileProps {
  tile: Tile;
  handleClick: (tile: Tile) => void;
  handleRightClickTile: (tile: Tile) => void;
}

const oddOrEven = (tile: Tile): string => {
  return (tile.line + tile.column) % 2 === 0 ? "even" : "odd";
};

const getBorder = (tile: Tile): string => {
  let classNames = "";
  if (tile.up) classNames += " up";
  if (tile.down) classNames += " down";
  if (tile.left) classNames += " left";
  if (tile.right) classNames += " right";

  return classNames;
};

const displaySymbol = (tile: Tile) => {
  if (tile.open) {
    return tile.mineCountSymbol === "bomb" ? "B" : tile.mineCountSymbol;
  } else {
    return tile.flagged ? <FlagIcon color="error" /> : "";
  }
};

function Tile(props: TileProps) {
  const { tile, handleClick, handleRightClickTile } = props;

  if (!tile.open)
    return (
      <Box
        className={`tile close ${oddOrEven(tile)} ${getBorder(tile)}`}
        onClick={() => handleClick(tile)}
        onContextMenu={(e) => {
          e.preventDefault();
          handleRightClickTile(tile);
        }}
      >
        {displaySymbol(tile)}
      </Box>
    );
  else
    return (
      <Box className={`tile open ${oddOrEven(tile)} ${getBorder(tile)}`}>
        {tile.mineCountSymbol === "bomb" ? "B" : tile.mineCountSymbol}
      </Box>
    );
}

export default Tile;
