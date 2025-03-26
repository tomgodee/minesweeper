import { useEffect, useState } from "react";
import type { Settings } from "../App";
import type { MineCountSymbol, Tile } from "../types";
import Field from "./Field";

interface FieldContainerProps {
  settings: Settings;
}

const findSurroundingTiles = (
  plot: Tile[][],
  position: { line: number; column: number }
): Tile[] => {
  const { line, column } = position;
  const surroundingTiles = [];
  const bound = plot.length - 1;

  const isTileNotOnFirstLine = line - 1 >= 0;
  const isTileNotOnFirstColumn = column - 1 >= 0;
  const isTileNotOnLastLine = line + 1 <= bound;
  const isTileNotOnLastColumn = column + 1 <= bound;

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
// TODO: the bound should be updated to support both dimensions
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
  for (let i = 0; i < size.width; i += 1) {
    plot.push([]);
    for (let j = 0; j < size.height; j += 1) {
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

const openTileArea = (tile: Tile, plot: Tile[][]) => {
  plot[tile.line][tile.column].open = true;

  const surroundingUnopenTiles = findSurroundingTiles(plot, {
    line: tile.line,
    column: tile.column,
  }).filter((tile) => !tile.open);

  surroundingUnopenTiles.map((tile) => {
    if (tile.mineCountSymbol === "0") {
      plot = openTileArea(tile, plot);
    } else {
      plot[tile.line][tile.column].open = true;
    }
  });

  return plot;
};

const openAllMinedTiles = (plot: Tile[][]) => {
  return plot.map((line) =>
    line.map((tile) => {
      if (tile.mineCountSymbol === "bomb") tile.open = true;
      return tile;
    })
  );
};

function FieldContainer(props: FieldContainerProps) {
  const { settings } = props;

  const [plot, setPlot] = useState<Tile[][]>([[]]);

  const clickTile = (clickedTile: Tile) => {
    if (clickedTile.mineCountSymbol === "0") {
      const newPlot = openTileArea(clickedTile, plot).map((line) => [...line]);
      setPlot(newPlot);
    } else if (clickedTile.mineCountSymbol === "bomb") {
      const newPlot = openAllMinedTiles(plot);
      setPlot(newPlot);
    } else {
      plot[clickedTile.line][clickedTile.column].open = true;
      const newPlot = plot.map((line) => [...line]);
      setPlot(newPlot);
    }
  };

  // TODO: This effect should run when the first click happens, not on mounted
  useEffect(() => {
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
  }, [settings]);

  return <Field plot={plot} handleClickTile={clickTile} />;
}

export default FieldContainer;
