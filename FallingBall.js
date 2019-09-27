class FallingBall {
  constructor(leftWall, rightWall) {
    this.x = random(leftWall, width-rightWall);
    this.y = 0;
    this.speed = 5;
  }

  move() {
    this.y += this.speed;
  }
  display() {
    fill(0);
    ellipse(this.x, this.y, 15, 15);
  }
}
