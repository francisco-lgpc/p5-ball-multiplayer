const url = ENV.production ? 'wss://p5-ball-multiplayer.herokuapp.com/' : 'ws://localhost:8999'

const socket = new WebSocket(url)

socket.onmessage = event => {
  const data = JSON.parse(event.data);
  const state = data.state;

  if (!state) return

  background(0)

  Object.entries(state.balls).forEach(([id, pos]) => {
    new Ball(50, pos.x, pos.y).show();
  })
}

function setup() {
  createCanvas(1000, 500)
  background(0)

  socket.send(JSON.stringify({
    payload: {
      command: "addBall",
      data: {
        x: 50,
        y: 50
      }
    }
  }))
}

function draw() {
  if (keyIsDown(LEFT_ARROW)) {
    move('LEFT')
  }

  if (keyIsDown(RIGHT_ARROW)) {
    move('RIGHT')
  }

  if (keyIsDown(UP_ARROW)) {
    move('UP')
  }

  if (keyIsDown(DOWN_ARROW)) {
    move('DOWN')
  }
}

function move(direction) {
  const message = {
    payload: {
      command: 'move',
      data: {
        direction
      }
    }
  };

  socket.send(JSON.stringify(message))
}
