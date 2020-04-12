import { BallData } from "./ball";

export interface Pos {
  x: number;
  y: number;
}

export interface GameState {
  balls: {
    [id: string]: BallData;
  };
}
