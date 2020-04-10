export interface Pos {
  x: number;
  y: number;
}

export interface GameState {
  balls: {
    [id: string]: Pos;
  };
}
