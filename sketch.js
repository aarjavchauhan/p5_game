let leftWallStart = 0
let rightWallStart = 0
let start = false
let dropBallSpeed = 100

let fallingBalls = []

function setup() {
  let mouseColor = color(139,0,0)
  noCursor()
  createCanvas(500, 500)
  ball = new MainBall()
}

function draw() {
  background(255);
  if (start) {
    startGame()
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

function wallIntersect(xCoordinate)
{
  if(xCoordinate < leftWallStart || xCoordinate > width-rightWallStart)
  {
    console.log('a ball is in the area')
    return true
  }
}

function startGame(){
  if(frameCount%50 == 0)
  {
    makeDrop()
  }
  drawWall()
  ball.move()
  ball.display()
  //  console.log(fallingBalls.length);
  for (var i = fallingBalls.length-1; i >0  ; i--) {
    fallingBalls[i].move()
    fallingBalls[i].display()
    if(wallIntersect(fallingBalls[i].x))
      fallingBalls.splice(i,1)
  }

  fill(0, 102, 153);
  text(ball.x + '--' + ball.y, mouseX, mouseY);
}

function keyPressed() {
  if (keyCode === 32) {
    start = true;
    console.log("Space Pressed")
  }
  return false; // prevent default
}

function makeDrop(){
  fallingBalls.push(new FallingBall(leftWallStart, rightWallStart))
}

function endGame(){

}
