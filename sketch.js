let leftWallStart = 0
let rightWallStart = 0
let start = false
let end = false
let dropBallSpeed = 2
let dropRate = 50
let goodBallRate = 3
let scoreCounter = 0
let fallingBalls = []
let wallRetreatSpeed = 200
let wallIncreaseSpeed = 0.2

function setup() {
  let mouseColor = color(139,0,0)
  noCursor()
  noStroke()
  createCanvas(500, 500)
  mainBall = new MainBall()
}

function draw() {
  background(255)
  startGameScreen()
  if (start) {
    startGame()
  }
}

function drawWall(){
  push()
  rectMode(CORNERS)
  noStroke()
  fill(0)
  rect(0, 0, leftWallStart, height)
  fill(0)
  rect(width, 0, width-rightWallStart, height)
  if(leftWallStart<width/2 || rightWallStart<width/2){
    leftWallStart += wallIncreaseSpeed
    rightWallStart += wallIncreaseSpeed
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
  background(255)


  if(end != true){
    push()
    scoreCounter += fallingBalls.length
    textAlign(CENTER)
    textStyle(BOLDITALIC)
    textSize(16)
    text(round(scoreCounter/100), width/2, 0.9*height)
    scoringLogic(round(scoreCounter/100))

    if(frameCount%dropRate == 0 && leftWallStart != width/2)
    {
      makeDrop()
    }
    drawWall()
    mainBall.move()
    mainBall.display()
    if(wallIntersect(mainBall.x))
      end = true

    for (var i = fallingBalls.length-1 ; i >0  ; i--) {
      fallingBalls[i].move()
      fallingBalls[i].display()
      if(wallIntersect(fallingBalls[i].x)){
        fallingBalls.splice(i,1)
      }
      else if(mainBall.intersect(fallingBalls[i].x,fallingBalls[i].y) && fallingBalls[i].kind == "good"){
        if(leftWallStart < wallRetreatSpeed){
          leftWallStart = 0
          rightWallStart = 0
        }else {
          leftWallStart -= wallRetreatSpeed
          rightWallStart -= wallRetreatSpeed
        }
        fallingBalls.splice(i,1)
      }
      else if(mainBall.intersect(fallingBalls[i].x,fallingBalls[i].y) && fallingBalls[i].kind == "bad"){
        fallingBalls.splice(i,1)
        end = true
      }
    }
    pop()
  }
  else {
    endGameScreen(round(scoreCounter/100))
  }
}

function scoringLogic(score){

  if (score > 20 && score < 40) {
    dropRate = 30
    wallIncreaseSpeed = 0.3
    dropBallSpeed = 3
  }
  else if (score > 40 && score < 60) {
    dropRate = 20
    wallIncreaseSpeed = 0.5
    dropBallSpeed = 4
  }
  else if (score > 60 && score < 80){
    dropRate = 15
    wallIncreaseSpeed = 0.7
    dropBallSpeed = 5
  }
  else if (score > 80 && score < 100){
    dropRate = 15
    wallIncreaseSpeed = 0.8
    dropBallSpeed = 5
  }
  else if (score > 100){
    dropRate = 10
    wallIncreaseSpeed = 1.2
    dropBallSpeed = 5
  }
}

function makeDrop(){
  var rand = random(0,10)
  if(rand<goodBallRate)
    fallingBalls.push(new FallingBall(leftWallStart, rightWallStart, dropBallSpeed, "good"))
  else
    fallingBalls.push(new FallingBall(leftWallStart, rightWallStart, dropBallSpeed, "bad"))
}

function startGameScreen(){
  push()
  fill(232, 37, 37)
  circ = circle(width/2, height/2, 25)
  mainBall.move()
  mainBall.display()
  if(mainBall.intersect(width/2,height/2))
    start = true
  pop()
}

function endGameScreen(finalScore){
  push()
  textAlign(CENTER)
  textStyle(BOLDITALIC)
  textSize(20)
  fill(232, 0, 0)
  text(finalScore, width/2, height/2)
  pop()
}
