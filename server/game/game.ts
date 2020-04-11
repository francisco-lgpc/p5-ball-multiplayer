import { GameState, Pos } from "./game-state.model";
import { Ball } from "./ball";

export class Game {
  readonly balls: { [id: string]: Ball } = {};

  addBall(id: string, data: Pos) {
    this.balls[id] = new Ball(id, data);
  }

  removeBall(id: string) {
    delete this.balls[id];
  }

  move(id: string, data: { direction: string }) {
    switch (data.direction) {
      case "UP":
        this.balls[id].pos.y -= 3;
        break;
      case "DOWN":
        this.balls[id].pos.y += 3;
        break;
      case "LEFT":
        this.balls[id].pos.x -= 3;
        break;
      case "RIGHT":
        this.balls[id].pos.x += 3;
        break;

      default:
        break;
    }
  }

  getState(): GameState {
    return {
      balls: Object.values(this.balls).reduce(
        (balls, ball) => ({
          ...balls,
          [ball.id]: ball.pos
        }),
        {}
      )
    };
  }
}
