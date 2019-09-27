let leftWallStart = 0
let rightWallStart = 0
let start = false
let end = false
let dropBallSpeed = 100
let scoreCounter = 0
let fallingBalls = []
let wallRetreatSpeed = 10

function setup() {
  let mouseColor = color(139,0,0)
  noCursor()
  createCanvas(500, 500)
  mainBall = new MainBall()
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
    leftWallStart += 0.2
    rightWallStart += 0.2
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
  if(end != true){
    if(frameCount%50 == 0 && leftWallStart != width/2)
    {
      makeDrop()
    }
    drawWall()
    mainBall.move()
    mainBall.display()
    if(wallIntersect(mainBall.x))
    end = true

    for (var i = fallingBalls.length-1; i >0  ; i--) {
      fallingBalls[i].move()
      fallingBalls[i].display()
      if(wallIntersect(fallingBalls[i].x)){
        fallingBalls.splice(i,1)
      }
      else if(mainBall.intersect(fallingBalls[i].x,fallingBalls[i].y)){
        leftWallStart -= wallRetreatSpeed;
        rightWallStart -= wallRetreatSpeed;
        fallingBalls.splice(i,1)
        end = true
      }
    }

    fill(0, 102, 153);
    text(mainBall.x + '--' + mainBall.y, mouseX, mouseY);
  }
  else {
    push()
    fill(0, 102, 153);
    text('Game Over!', width/2, height/2);
    pop()
  }
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

function endGameCollision(ball)
{

}

function endGame(end){
  return end
}
