export enum Command {
  addBall = "addBall",
  setMovement = "setMovement"
}

export function isCommand(key: any): key is Command {
  return Object.keys(Command).includes(key);
}
