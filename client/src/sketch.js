const url = ENV.production ? 'wss://p5-ball-multiplayer.herokuapp.com/' : 'ws://localhost:8999'

const socket = new WebSocket(url)

let socketConnected = false

const balls = {}

const movement = {
  UP: false,
  DOWN: false,
  LEFT: false,
  RIGHT: false,
}

socket.onmessage = event => {
  const data = JSON.parse(event.data)
  const state = data.state

  if (!state) return

  Object.entries(state.balls).forEach(([id, ball]) => {
    if (balls[id]) {
      balls[id].pos = ball.pos
    } else {
      balls[id] = new Ball(ball.r, ball.pos)
    }
  })

  Object.keys(balls).forEach(id => {
    if (!state.balls[id]) {
      delete balls[id]
    }
  })
}

socket.onopen = () => {
  socketConnected = true
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(0)
}

function draw() {
  background(0)

  if (ChooseBall.choosingBall) {
    ChooseBall.showChooseBallMenu()
    return
  }

  Object.values(balls).forEach(ball => {
    ball.show()
  })

  if (frameCount % 3 === 0) {
    movement.LEFT = keyIsDown(LEFT_ARROW)
    movement.RIGHT = keyIsDown(RIGHT_ARROW)
    movement.UP = keyIsDown(UP_ARROW)
    movement.DOWN = keyIsDown(DOWN_ARROW)

    move()
  }
}

function mouseClicked(e) {
  if (ChooseBall.choosingBall) {
    ChooseBall.mouseClicked(e)
  }
}
function mouseMoved(e) {
  if (ChooseBall.choosingBall) {
    ChooseBall.mouseMoved(e)
  }
}

function move() {
  if (!socketConnected) return

  const message = {
    payload: {
      command: 'setMovement',
      data: movement,
    },
  }

  socket.send(JSON.stringify(message))
}
