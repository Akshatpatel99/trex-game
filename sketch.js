var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var gameOver,gameOverImage;
var restart,restartImage;
var name;
var score;


function preload() {
  gameOverImage = loadImage("gameOver.png");
  restartImage= loadImage("restart.png");
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  gameOver = createSprite(300,100,50,10);
  gameOver.addImage(gameOverImage)
  gameOver.scale=2
  gameOver.visible = false;
  
  restart = createSprite(300,150,10,10)
  restart.addImage(restartImage)
  restart.scale=0.5
  restart.visible = false;
  
  
 name="Akshat"

  
  score = 0;
}

function draw() {
 
  trex.debug=true
  background(180);
  text("Score: " + score, 500, 50);
trex.setCollider("circle",0,0,40)

 
  
  console.log(name)
  if (gameState === PLAY) {
    //move the ground
    ground.velocityX = -4;
    
    score = score + Math.round(getFrameRate() / 60);
    
    if (keyDown("space") && trex.y >= 100) {
      trex.velocityY = -13;
    }
    
    if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  
    trex.velocityY = trex.velocityY + 0.8
    
    
    
    //spawn the clouds
  spawnClouds();

  //spawn obstacles on the ground
  spawnObstacles();
    
   if(obstaclesGroup.isTouching(trex)){
      //gameState = END
     gameState = PLAY
     trex.velocityY=-7
    } 
    
  } else if (gameState === END) {
    //stop the ground
    trex.changeAnimation("collided", trex_collided)
    ground.velocityX = 0;
obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
      obstaclesGroup.setLifetimeEach(-7)
    cloudsGroup.setLifetimeEach(-6)
    gameOver.visible=true;
    restart.visible=true;
  }
 
  if(mousePressedOver(restart)){reset()}
    

     
  trex.collide(invisibleGround);

  

  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(400, 165, 10, 40);
    obstacle.velocityX = -6;


    // //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    //adding obstacles to the group
    obstaclesGroup.add(obstacle);
  }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.y = Math.round(random(10, 60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 134;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //adding cloud to the group
    cloudsGroup.add(cloud);
  }

}
function reset(){
  gameState = PLAY
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  restart.visible=false
  gameOver.visible=false
score=0
   trex.changeAnimation("running",trex_running)
}


 

