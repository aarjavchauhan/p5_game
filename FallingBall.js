class FallingBall {
  constructor(leftWall, rightWall, dropBallSpeed) {
    this.x = random(leftWall, width-rightWall);
    this.y = 0;
    this.speed = dropBallSpeed;
  }

  move() {
    this.y += this.speed;
  }
  display() {
    fill(0);
    ellipse(this.x, this.y, 15, 15);
  }
}
