class MainBall {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.size = 25;
  }
  move() {
    this.x = mouseX;
    this.y = mouseY;
  }
  display(){
    push()
    noStroke()
    fill(255)
    ellipse(this.x, this.y, this.size, this.size)
    pop()
  }
  intersect(d){
    let distance = dist(mouseX, mouseY, d.x, d.y);
    if(distance < this.r){
      return true;
    }
  }
}
