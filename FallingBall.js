class FallingBall {
  constructor(leftWall, rightWall, dropBallSpeed, kindOfBall) {
    this.x = random(leftWall, width-rightWall)
    this.y = 0
    this.speed = dropBallSpeed
    this.kind = kindOfBall
  }

  move() {
    this.y += this.speed
  }
  display() {
    if (this.kind == "good") {
        fill(232, 0, 0)
    } else {
        fill(0)
    }
    ellipse(this.x, this.y, 15, 15)
  }
}
