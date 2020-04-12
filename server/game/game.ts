import { GameState, Pos } from "./game-state.model";
import { Ball, BallData } from "./ball";
import { Movement } from "./movement.model";

export class Game {
  readonly balls: { [id: string]: Ball } = {};

  readonly ballsData: { [id: string]: BallData } = {};

  addBall(id: string, data: Pos) {
    this.balls[id] = new Ball(id, data);
  }

  removeBall(id: string) {
    delete this.balls[id];
    delete this.ballsData[id];
  }

  setMovement(id: string, movement: Movement) {
    this.balls[id].movement = movement;
  }

  updateBall(id: string, delta: number) {
    if (!this.balls[id]) return;

    this.balls[id].update(delta);
    this.ballsData[id] = this.balls[id].getData();
  }

  getState(): GameState {
    return { balls: this.ballsData };
  }
}