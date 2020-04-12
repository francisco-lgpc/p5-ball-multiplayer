import { Pos } from "./game-state.model";
import { Movement } from "./movement.model";
import Vector from "victor";

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

  public pos: Vector;
  private vel: Vector = new Vector(0, 0);
  private acc: Vector = new Vector(0, 0);

  constructor(public readonly id: string, posData: Pos) {
    this.pos = Vector.fromObject(posData);
  }

  applyForce(force: Vector) {
    this.acc.add(force);
  }

  update(delta: number) {
    const scale = Math.round(1 * delta);
  
    if (this.movement.UP) this.applyForce(new Vector(0, -scale));
    if (this.movement.DOWN) this.applyForce(new Vector(0, scale));
    if (this.movement.LEFT) this.applyForce(new Vector(-scale, 0));
    if (this.movement.RIGHT) this.applyForce(new Vector(scale, 0));

    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.vel.multiplyScalar(Math.pow(0.999, delta));

    this.acc.multiplyScalar(0);
  }

  getData(): BallData {
    return { pos: { x: this.pos.x, y: this.pos.y } };
  }
}
