var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(300,450);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
}

function spawnDoors(){
  if(frameCount%200 == 0){
    door = createSprite(Math.round(random(100,559)), -50);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 600;
    doorsGroup.add(door);

    climber = createSprite(door.x, 10);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 600;
    climbersGroup.add(climber);
    ghost.depth = door.depth;
    ghost.depth += 1;

    invisibleBlock = createSprite(climber.x, 15, climber.width, 2);
    invisibleBlock.velocityY = 1;
    invisibleBlock.visible = false;
    invisibleBlockGroup.add(invisibleBlock);

  }
  
}


function draw() {
  background(200);
  
  
  
  if(gameState == "play"){
    if(tower.y > 400){
      tower.y = 300
  }
  spawnDoors();
  if(keyDown(LEFT_ARROW)){
    ghost.x -= 4;
  }
  if(keyDown(RIGHT_ARROW)){
    ghost.x += 4;
  }
  if(keyDown("space")){
    ghost.velocityY = -4;
  }
  ghost.velocityY = ghost.velocityY+0.8;
  if(ghost.isTouching(invisibleBlockGroup)){
    gameState = "end";
  }
  }
  
  if(gameState == "end"){
    tower.destroy();
    ghost.destroy();
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    textSize(20);
    fill("blue");
    text("Game Over", 300, 200);
  }
  drawSprites();
}

