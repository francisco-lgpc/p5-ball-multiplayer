class ChooseBall {
  static choosingBall = true

  // TODO: move ballType business logic to backend,
  // frontend should just send an ID of the ballType
  // this frontend ballTypes object should have entries
  // like this -> [id]: { text, y }
  static ballTypes = {
    ball1: {
      text: 'Ball 1',
      y: 400,
      data: {
        maxSpeed: 100,
        movePower: 4,
        r: 4000,
      },
    },
    ball2: {
      text: 'Ball 2',
      y: 500,
      data: {
        maxSpeed: 200,
        movePower: 10,
        r: 2500,
      },
    },
    ball3: {
      text: 'Ball 3',
      y: 600,
      data: {
        maxSpeed: 500,
        movePower: 15,
        r: 2000,
      },
    },
    ball4: {
      text: 'Ball 4',
      y: 700,
      data: {
        maxSpeed: 500,
        movePower: 30,
        r: 1000,
      },
    },
  }

  static asc = 0;

  static hoveredType = '';

  static showChooseBallMenu() {
    textSize(50)
    this.asc = textAscent()

    Object.entries(ChooseBall.ballTypes).forEach(([id, ballType]) => {
      this.hoveredType === id ? fill(200, 0, 0) : fill(255)
      text(ballType.text, 900, ballType.y)
    })
  }

  static mouseIsOver(ballY, e) {
    if (Math.abs(e.x - 950) > 150) return false

    const centerY = ballY - (this.asc / 2)
    return Math.abs(e.y - centerY) < 50
  }

  static mouseClicked(e) {
    Object.values(ChooseBall.ballTypes).forEach(ballType => {
      if (this.mouseIsOver(ballType.y, e)) {
        ChooseBall.choose(ballType)
      }
    })
  }

  static mouseMoved(e) {
    this.hoveredType = ''
    Object.entries(ChooseBall.ballTypes).forEach(([id, ballType]) => {
      if (this.mouseIsOver(ballType.y, e)) {
        this.hoveredType = id
      }
    })
  }

  static choose(ballType) {
    this.choosingBall = false
    console.log(ballType)

    socket.send(JSON.stringify({
      payload: {
        command: 'addBall',
        data: ballType.data,
      },
    }))
  }
}
