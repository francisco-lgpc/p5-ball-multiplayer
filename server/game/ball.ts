import { Pos } from "./game-state.model";

export class Ball {
  constructor(
    public readonly id: string,
    public pos: Pos,
  ) {}
}