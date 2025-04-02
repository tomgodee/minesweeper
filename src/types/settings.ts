type Difficulty = "easy" | "medium" | "hard" | "custom" | "surprise me";

interface Settings {
  width: number;
  height: number;
  mineCount: number;
  difficulty: Difficulty;
}

export type { Difficulty, Settings };
