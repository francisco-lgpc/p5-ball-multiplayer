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

  private readonly maxSpeed = 200;
  private readonly movePower = 15;
  private readonly dragCoeficient = 0.97;

  public pos: Vector;
  private vel: Vector = new Vector(0, 0);
  private acc: Vector = new Vector(0, 0);

  private readonly mass: number = 1;
  private readonly invMass: number = 1 / this.mass;
  private readonly r: number = 2000;
  private readonly restitution = 0.3;

  constructor(public readonly id: string, posData: Pos) {
    this.pos = Vector.fromObject(posData);
  }

  applyForce(force: Vector) {
    this.acc.add(force.divideScalar(this.mass));
  }

  update(delta: number, targetFPS = 60) {
    if (this.movement.UP) this.applyForce(new Vector(0, -this.movePower));
    if (this.movement.DOWN) this.applyForce(new Vector(0, this.movePower));
    if (this.movement.LEFT) this.applyForce(new Vector(-this.movePower, 0));
    if (this.movement.RIGHT) this.applyForce(new Vector(this.movePower, 0));

    const updateScale = delta * targetFPS / 1000;

    this.vel.multiplyScalar(this.dragCoeficient ** updateScale);

    if (this.vel.lengthSq() > this.maxSpeed * this.maxSpeed) {
      this.vel.normalize().multiplyScalar(this.maxSpeed)
    }

    this.vel.add(this.acc.clone().multiplyScalar(updateScale));
    this.pos.add(this.vel.clone().multiplyScalar(updateScale));

    this.acc.multiplyScalar(0);
  }

  collides(other: Ball): boolean {
    return this.pos.distanceSq(other.pos) <= (this.r + other.r) ** 2;
  }

  getCollisionNormal(other: Ball): Vector {
    return other.pos
      .clone()
      .subtract(this.pos)
      .normalize();
  }

  getCollisionImpulse(other: Ball, normal: Vector): Vector {
    // Calculate relative velocity
    const rv = other.vel.clone().subtract(this.vel);

    // Calculate relative velocity in terms of the normal direction
    const velAlongNormal = rv.dot(normal);

    // Do not resolve if velocities are separating
    if (velAlongNormal > 0) return new Vector(0, 0);

    // Calculate restitution
    const e = Math.min(this.restitution, other.restitution);

    // Calculate impulse scalar
    let impulseScalar = -(1 + e) * velAlongNormal / (this.invMass + other.invMass);

    // return impulse vector
    return normal.clone().multiplyScalar(impulseScalar);
  }

  getPositionalCorrection(other: Ball, normal: Vector) {
    const percent = 0.2;
    const slop = 0.01;
    const penetration = this.r + other.r - this.pos.distance(other.pos);

    const correctionScalar =
      Math.max((penetration - slop) / (this.invMass + other.invMass)) * percent;

    return normal.clone().multiplyScalar(correctionScalar);
  }

  getData(): BallData {
    return { pos: { x: this.pos.x, y: this.pos.y } };
  }
}
