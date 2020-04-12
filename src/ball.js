class Ball {
  constructor(r, pos) {
    this.r = r
    this.pos = pos
  }

  show() {
    fill(255)
    ellipse(this.pos.x / 100, this.pos.y / 100, this.r, this.r)
  }
}
