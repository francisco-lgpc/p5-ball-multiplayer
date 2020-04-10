class Ball {
  constructor(r, x, y) {
    this.r = r
    this.x = x
    this.y = y
  }

  show() {
    fill(255)
    ellipse(this.x, this.y, this.r, this.r)
  }
}
