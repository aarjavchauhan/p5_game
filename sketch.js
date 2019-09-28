let leftWallStart = 0
let rightWallStart = 0
let start = false
let end = false
let restartedGame = false
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
  else {
    endGameScreen(round(scoreCounter/100))
  }
}

//draw moving walls on either side of the canvas
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

//check whether a ball intersects with the walls
function wallIntersect(xCoordinate)
{
  if(xCoordinate < leftWallStart || xCoordinate > width-rightWallStart)
  {
    return true
  }
}

//main gameplay functions
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
        scoreCounter += 2500
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

//calculate and adjust speed of walls,
//rate of the # of balls falling and their speed based on the score
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

//create a falling ball (thanks Joel for this function!)
function makeDrop(){
  var rand = random(0,10)
  if(rand<goodBallRate)
  fallingBalls.push(new FallingBall(leftWallStart, rightWallStart, dropBallSpeed, "good"))
  else
  fallingBalls.push(new FallingBall(leftWallStart, rightWallStart, dropBallSpeed, "bad"))
}

//start game screen
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

//end game screen and re-adjust all values, show score
function endGameScreen(finalScore){
  background(255)
  push()
  fill(232, 0, 0)
  
  if(finalScore != 0){
    textAlign(CENTER)
    textStyle(BOLDITALIC)
    textSize(20)
    text(finalScore, width/2, height/2+50)
  }

  circ = circle(width/2, height/2, 25)
  start = false

  mainBall.move()
  mainBall.display()
  if(mainBall.intersect(width/2,height/2)){
    leftWallStart = 0
    rightWallStart = 0
    start = true
    end = false
    restartedGame = false
    dropBallSpeed = 2
    dropRate = 50
    goodBallRate = 3
    scoreCounter = 0
    fallingBalls = []
    wallRetreatSpeed = 200
    wallIncreaseSpeed = 0.2
  }
  pop()
}
