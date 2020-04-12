import { Pos } from "./game-state.model";
import { Movement } from "./movement.model";

export interface BallData {
  pos: Pos;
}

export class Ball {
  public movement: Movement = {
    UP: false,
    DOWN: false,
    LEFT: false,
    RIGHT: false
  };

  constructor(public readonly id: string, public pos: Pos) {}

  move(delta: number) {
    const scale = 0.2 * delta;

    if (this.movement.UP) this.pos.y -= scale;
    if (this.movement.DOWN) this.pos.y += scale;
    if (this.movement.LEFT) this.pos.x -= scale;
    if (this.movement.RIGHT) this.pos.x += scale;
  }

  getData(): BallData {
    return { pos: this.pos };
  }
}
