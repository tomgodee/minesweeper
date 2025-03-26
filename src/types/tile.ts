interface Tile {
  line: number;
  column: number;
  mineCountSymbol: MineCountSymbol;
  mineScore: number;
  open: boolean;
}

type MineCountSymbol =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "0"
  | "bomb";

export type { Tile, MineCountSymbol };
