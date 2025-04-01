import FlagIcon from "@mui/icons-material/Flag";
import Box from "@mui/material/Box";
import MineIcon from "../icons/mine.svg?react";
import type { Tile } from "../types";
import "./Tile.scss";

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

const getMineCountColor = (count: Tile["mineCountSymbol"]) => {
  if (count === "1") return "one";
  if (count === "2") return "two";
  if (count === "3") return "three";
  if (count === "4") return "four";
  if (count === "5") return "five";
  if (count === "6") return "six";
  if (count === "7") return "seven";
  if (count === "8") return "eight";
};

const isExploded = (tile: Tile) => (tile.exploded ? " exploded" : "");

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
        {tile.flagged ? <FlagIcon color="error" /> : ""}
      </Box>
    );
  else
    return (
      <Box
        className={`tile open ${oddOrEven(tile)} ${getBorder(
          tile
        )} ${isExploded(tile)}`}
        onContextMenu={(e) => e.preventDefault()}
      >
        {tile.mineCountSymbol === "bomb" ? (
          <MineIcon />
        ) : (
          <Box className={getMineCountColor(tile.mineCountSymbol)}>
            {tile.mineCountSymbol === "0" ? "" : tile.mineCountSymbol}
          </Box>
        )}
      </Box>
    );
}

export default Tile;
