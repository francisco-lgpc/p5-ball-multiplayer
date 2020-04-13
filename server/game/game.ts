import { GameState, Pos } from "./game-state.model";
import { Ball, BallData } from "./ball";
import { Movement } from "./movement.model";

export class Game {
  readonly balls: { [id: string]: Ball } = {};

  readonly ballsData: { [id: string]: BallData } = {};

  addBall(id: string, data: Pos): void {
    this.balls[id] = new Ball(id, data);
  }

  removeBall(id: string): void {
    delete this.balls[id];
    delete this.ballsData[id];
  }

  setMovement(id: string, movement: Movement): void {
    this.balls[id].movement = movement;
  }

  updateBalls(delta: number): void {
    Object.values(this.balls).forEach(ball => {
      this.updateBall(ball.id, delta);
    });
  }

  resolveCollisions(): void {
    const balls = Object.values(this.balls);
    balls.forEach((ballA, i) => {
      balls.slice(i + 1).forEach(ballB => {
        if (ballA.collides(ballB)) {
          const normal = ballA.getCollisionNormal(ballB);

          const impulse = ballA.getCollisionImpulse(ballB, normal);
          ballB.applyForce(impulse);
          ballA.applyForce(impulse.clone().multiplyScalar(-1));

          const posCorrection = ballA.getPositionalCorrection(ballB, normal);
          ballB.applyForce(posCorrection);
          ballA.applyForce(posCorrection.clone().multiplyScalar(-1));
        }
      });
    });
  }

  getState(): GameState {
    return { balls: this.ballsData };
  }

  private updateBall(id: string, delta: number): void {
    if (!this.balls[id]) return;

    this.balls[id].update(delta);
    this.ballsData[id] = this.balls[id].getData();
  }
}
