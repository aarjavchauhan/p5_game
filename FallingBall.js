class FallingBall {
  constructor(leftWall, rightWall) {
    this.x = random(leftWall, width-rightWall);
    this.y = 0;
    this.speed = 1;
  }

  move() {
    this.y += this.speed;
  }
  display() {
    fill(0);
    ellipse(this.x, this.y, 4, 4);

    // different way to splice elements from array
    // if (this.y > height) {
    //   let index = raindrops.indexOf(this);
    //   raindrops.splice(index, 1);
    // }
  }
}
