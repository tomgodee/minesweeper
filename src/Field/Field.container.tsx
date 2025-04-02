import { useEffect, useState } from "react";
import type { GameState, Settings } from "../App";
import type { MineCountSymbol, Tile } from "../types";
import Field from "./Field";

const findSurroundingTiles = (
  plot: Tile[][],
  position: { line: number; column: number }
): Tile[] => {
  const { line, column } = position;
  const surroundingTiles = [];
  const lineBound = plot.length - 1;
  const columnBound = plot[0].length - 1;

  const isTileNotOnFirstLine = line - 1 >= 0;
  const isTileNotOnFirstColumn = column - 1 >= 0;
  const isTileNotOnLastLine = line + 1 <= lineBound;
  const isTileNotOnLastColumn = column + 1 <= columnBound;

  if (isTileNotOnFirstLine && isTileNotOnFirstColumn) {
    const upperLeftTile = plot[line - 1][column - 1];
    surroundingTiles.push(upperLeftTile);
  }

  if (isTileNotOnFirstLine) {
    surroundingTiles.push(plot[line - 1][column]);
  }

  if (isTileNotOnFirstLine && isTileNotOnLastColumn) {
    surroundingTiles.push(plot[line - 1][column + 1]);
  }

  if (isTileNotOnFirstColumn) {
    surroundingTiles.push(plot[line][column - 1]);
  }

  if (isTileNotOnLastLine && isTileNotOnFirstColumn) {
    surroundingTiles.push(plot[line + 1][column - 1]);
  }

  if (isTileNotOnLastLine) {
    surroundingTiles.push(plot[line + 1][column]);
  }

  if (isTileNotOnLastColumn) {
    surroundingTiles.push(plot[line][column + 1]);
  }

  if (isTileNotOnLastLine && isTileNotOnLastColumn) {
    surroundingTiles.push(plot[line + 1][column + 1]);
  }

  return surroundingTiles;
};

/**
 * Find the number of surrounding mines of a tile
 */
const calculateTileMineCount = (
  plot: Tile[][],
  position: { line: number; column: number }
) => {
  const surroundingTiles = findSurroundingTiles(plot, position);

  return surroundingTiles.reduce((mineCount, tile) => {
    return tile.mineCountSymbol === "bomb" ? mineCount + 1 : mineCount;
  }, 0);
};

const calculateMineCount = (plot: Tile[][]): Tile[][] => {
  for (let i = 0; i < plot.length; i += 1) {
    for (let j = 0; j < plot[i].length; j += 1) {
      if (plot[i][j].mineCountSymbol !== "bomb") {
        const mineCount = calculateTileMineCount(plot, { line: i, column: j });
        plot[i][j].mineCountSymbol = String(mineCount) as MineCountSymbol;
      }
    }
  }

  return plot;
};

/**
 * Transform a list of tiles to a 2D array of tiles
 */
const transformTilesToPlot = (
  tiles: Tile[],
  size: { width: number; height: number }
): Tile[][] => {
  const plot: Tile[][] = [];
  for (let i = 0; i < size.height; i += 1) {
    plot.push([]);
    for (let j = 0; j < size.width; j += 1) {
      plot[i].push(tiles[size.width * i + j]);
    }
  }

  return plot;
};

const generateTiles = (size: { width: number; height: number }): Tile[] => {
  const tiles: Tile[] = [];

  for (let i = 0; i < size.width; i += 1) {
    for (let j = 0; j < size.height; j += 1) {
      tiles.push({
        column: i,
        line: j,
        mineCountSymbol: "0",
        mineScore: Math.random(),
        open: false,
        up: false,
        down: false,
        left: false,
        right: false,
        flagged: false,
        exploded: false,
      });
    }
  }

  return tiles;
};

/**
 * Give the tiles with lowest mineScore to contain a mine.
 * The number of tiles depends on the mineCount.
 */
const generateMines = (tiles: Tile[], mineCount: Settings["mineCount"]) => {
  return tiles
    .sort((a, b) => a.mineScore - b.mineScore)
    .map((tile, index) => {
      if (index < mineCount) tile.mineCountSymbol = "bomb";
      return tile;
    })
    .sort((a, b) => {
      if (a.line === b.line) return a.column - b.column;
      return a.line - b.line;
    });
};

const openTileArea = (tile: Tile, plot: Tile[][], wrongFlagCount = 0) => {
  plot[tile.line][tile.column].open = true;

  const surroundingUnopenTiles = findSurroundingTiles(plot, {
    line: tile.line,
    column: tile.column,
  }).filter((tile) => !tile.open);

  surroundingUnopenTiles.map((tile) => {
    // Tile has been flagged but doesn't have a mine
    if (tile.flagged) {
      tile.flagged = false;
      wrongFlagCount += 1;
    }

    if (tile.mineCountSymbol === "0") {
      ({ plot, wrongFlagCount } = openTileArea(tile, plot, wrongFlagCount));
    } else {
      plot[tile.line][tile.column].open = true;
    }
  });

  return { plot, wrongFlagCount };
};

const openAllMinedTiles = (plot: Tile[][]) => {
  return plot.map((line) =>
    line.map((tile) => {
      if (tile.mineCountSymbol === "bomb") tile.open = true;
      return tile;
    })
  );
};

const calculateAllTilesBorder = (plot: Tile[][]) => {
  for (let line = 0; line < plot.length; line += 1) {
    for (let column = 0; column < plot[line].length; column += 1) {
      if (line - 1 >= 0) plot[line][column].up = plot[line - 1][column].open;

      if (line + 1 <= plot.length - 1)
        plot[line][column].down = plot[line + 1][column].open;

      if (column - 1 >= 0)
        plot[line][column].left = plot[line][column - 1].open;

      if (column + 1 <= plot[line].length - 1)
        plot[line][column].right = plot[line][column + 1].open;
    }
  }

  return plot;
};

const calculateTileBorder = (tile: Tile, plot: Tile[][]) => {
  const isTileNotOnFirstLine = tile.line - 1 >= 0;
  const upperTile = isTileNotOnFirstLine
    ? plot[tile.line - 1][tile.column]
    : undefined;
  if (isTileNotOnFirstLine && upperTile && !upperTile.open)
    upperTile.down = true;

  const isTileNotOnLastLine = tile.line + 1 <= plot.length - 1;
  const lowerTile = isTileNotOnLastLine
    ? plot[tile.line + 1][tile.column]
    : undefined;
  if (isTileNotOnLastLine && lowerTile && !lowerTile.open) lowerTile.up = true;

  const isTileNotOnFirstColumn = tile.column - 1 >= 0;
  const leftTile = isTileNotOnFirstColumn
    ? plot[tile.line][tile.column - 1]
    : undefined;
  if (isTileNotOnFirstColumn && leftTile && !leftTile.open)
    leftTile.right = true;

  const isTileNotOnLastColumn = tile.column + 1 <= plot[tile.line].length - 1;
  const rightTile = isTileNotOnLastColumn
    ? plot[tile.line][tile.column + 1]
    : undefined;
  if (isTileNotOnLastColumn && rightTile && !rightTile.open)
    rightTile.left = true;
};

const flagTile = (tile: Tile, plot: Tile[][]) => {
  const { line, column } = tile;
  plot[line][column].flagged = !plot[line][column].flagged;
  return plot;
};

interface FieldContainerProps {
  settings: Settings;
  setFlagCount: React.Dispatch<React.SetStateAction<number>>;
  openTileCount: number;
  setOpenTileCount: React.Dispatch<React.SetStateAction<number>>;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

function FieldContainer(props: FieldContainerProps) {
  const {
    settings,
    setFlagCount,
    // openTileCount,
    setOpenTileCount,
    gameState,
    setGameState,
  } = props;

  const [plot, setPlot] = useState<Tile[][]>([[]]);

  const clickTile = (clickedTile: Tile) => {
    if (clickedTile.flagged || gameState === "lost" || gameState === "won")
      return;

    if (clickedTile.mineCountSymbol === "0") {
      const { plot: newPlot, wrongFlagCount } = openTileArea(clickedTile, plot);
      const plotWithBorder = calculateAllTilesBorder(newPlot).map((line) => [
        ...line,
      ]);
      setPlot(plotWithBorder);
      setFlagCount((prevState) => prevState + wrongFlagCount);
    } else if (clickedTile.mineCountSymbol === "bomb") {
      plot[clickedTile.line][clickedTile.column].exploded = true;
      const newPlot = openAllMinedTiles(plot);
      const plotWithBorder = calculateAllTilesBorder(newPlot);
      setPlot(plotWithBorder);
    } else {
      plot[clickedTile.line][clickedTile.column].open = true;
      calculateTileBorder(clickedTile, plot);
      const newPlot = plot.map((line) => [...line]);
      setPlot(newPlot);
    }
  };

  const rightClickTile = (clickedTile: Tile) => {
    if (gameState === "lost" || gameState === "won") return;

    if (!clickedTile.open && !clickedTile.flagged) {
      setFlagCount((prevState) => prevState - 1);
    } else if (clickedTile.flagged) {
      setFlagCount((prevState) => prevState + 1);
    }
    const newPlot = flagTile(clickedTile, plot);
    setPlot(newPlot);
  };

  // TODO: This effect should run when the first click happens, not on mounted
  useEffect(() => {
    if (gameState === "starting") {
      const tiles = generateTiles({
        width: settings.width,
        height: settings.height,
      });

      const tilesWithMines = generateMines(tiles, settings.mineCount);

      const plot = transformTilesToPlot(tilesWithMines, {
        width: settings.width,
        height: settings.height,
      });

      const plotWithMineCount = calculateMineCount(plot);

      setPlot(plotWithMineCount);
    }
  }, [settings, gameState]);

  useEffect(() => {
    let openTileCount = 0;
    let isBombExploded = false;

    for (let line = 0; line < plot.length; line += 1) {
      for (let column = 0; column < plot[line].length; column += 1) {
        openTileCount =
          plot[line][column].open &&
          plot[line][column].mineCountSymbol !== "bomb"
            ? openTileCount + 1
            : openTileCount;

        if (plot[line][column].exploded) isBombExploded = true;
      }
    }

    const tileCount = settings.width * settings.height;
    if (isBombExploded) {
      setGameState("lost");
    } else if (openTileCount + settings.mineCount === tileCount) {
      setGameState("won");
    } else if (
      openTileCount > 0 &&
      openTileCount + settings.mineCount < tileCount
    ) {
      setGameState("in progress");
    } else if (openTileCount === 0) {
      setGameState("starting");
    }

    setOpenTileCount(openTileCount);
  }, [
    plot,
    setGameState,
    setOpenTileCount,
    settings.height,
    settings.mineCount,
    settings.width,
  ]);

  return (
    <Field
      plot={plot}
      handleClickTile={clickTile}
      handleRightClickTile={rightClickTile}
    />
  );
}

export default FieldContainer;
