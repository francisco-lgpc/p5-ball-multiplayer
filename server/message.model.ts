import { GameState } from "./game/game-state.model";

interface MessageData {
  payload?: {
    command: string;
    data: any;
  };
  state?: GameState;
  text?: string;
}

export class Message implements MessageData {
  payload?: {
    command: string;
    data: any;
  };
  state?: GameState;
  text?: string;

  static fromJson(json: string) {
    return new Message(JSON.parse(json));
  }

  constructor(public data?: MessageData) {
    Object.assign(this, data);
  }

  json() {
    return JSON.stringify(this);
  }
}
