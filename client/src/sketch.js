function setup() {
  createCanvas(1000, 500)
  background(0)

  const ball = new Ball(50, 500, 250)

  console.log(ball.r)

  ball.show()
}
