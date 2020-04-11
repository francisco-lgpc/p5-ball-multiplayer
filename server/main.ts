import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import { v4 } from "uuid";
import { Message } from "./message.model";
import { Game } from "./game/game";

const app = express();

// initialize a simple http server
const server = http.createServer(app);

// initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

interface ExtWebSocket extends WebSocket {
  id?: string;
  isAlive?: boolean;
}

const game = new Game();

wss.on("connection", (ws: ExtWebSocket) => {
  // add id
  ws.id = v4();

  // route messages to game
  ws.on("message", (jsonMessage: string) => {
    try {
      const message = Message.fromJson(jsonMessage);

      const { command, data } = message.payload!;

      const fn = (game as any)[command];
      fn.apply(game, [ws.id, data]);
    } catch (error) {
      console.error(error);
    }
  });

  // check if clients are connected
  ws.isAlive = true;

  ws.on("pong", () => {
    ws.isAlive = true;
  });

  // remove ball on close
  ws.onclose = _event => {
    game.removeBall(ws.id!);
  }

  // send immediatly a feedback to the incoming connection
  const openConnectionMessage = new Message({
    text: "WebSocket connection open"
  });
  ws.send(openConnectionMessage.json());
});

setInterval(() => {
  wss.clients.forEach((ws: ExtWebSocket) => {
    if (!ws.isAlive) return;

    ws.send(new Message({ state: game.getState() }).json());
  });
}, 16);

// ping
setInterval(() => {
  wss.clients.forEach((ws: ExtWebSocket) => {
    if (!ws.isAlive) {
      ws.terminate();
      game.removeBall(ws.id!);

      return;
    }

    ws.isAlive = false;
    ws.ping();
  });
}, 10000);

// start our server
server.listen(process.env.PORT || 8999, () => {
  const adressIfo = server.address() as WebSocket.AddressInfo;
  console.log(`Server started on port ${adressIfo.port}`);
});
