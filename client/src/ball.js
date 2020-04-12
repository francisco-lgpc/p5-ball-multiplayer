class Ball {
  constructor(r, pos) {
    this.r = r
    this.pos = pos
  }

  show() {
    fill(255)
    ellipse(this.pos.x, this.pos.y, this.r, this.r)
  }
}
