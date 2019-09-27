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
    fill(0)
    ellipse(this.x, this.y, this.size, this.size)
    pop()
  }
  intersect(x, y){
    let distance = dist(mouseX, mouseY, x,y);
    if(distance < this.size){
      return true;
    }
  }
}
