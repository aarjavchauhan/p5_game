let leftWallStart = 0
let rightWallStart = 0

function setup() {
  let mouseColor = color(139,0,0)
  noCursor()
  createCanvas(500, 500);
  ball = new MainBall();
}

function draw() {
  background(0);
  drawWall()
  ball.display()
  fill(0, 102, 153);
  text(mouseX + '--' + mouseY, mouseX, mouseY);
}

class MainBall {
  constructor() {
    this.size = 25;
  }
  display(){
    push()
    noStroke()
    fill(255)
    ellipse(mouseX, mouseY, this.size, this.size)
    pop()
  }
}

function drawWall(){
  push()
  rectMode(CORNERS)
  noStroke()
  fill(221)
  rect(0, 0, leftWallStart, height)
  fill(139, 0, 120)
  rect(width, 0, width-rightWallStart, height)
  if(leftWallStart<width/2 || rightWallStart<width/2){
    leftWallStart++
    rightWallStart++
  }
  pop()
}
