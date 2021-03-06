var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score; 

 var bird,birdImg;
 var pipe,pipeimg;
 var pipe1,pipe1img;
 var pipe2,pipe2img;
 var pipe3,pipe3img;
 var pipe4,pipe4img
 var bgImg,bg;
 var gameOver,gameOverImg;
 var resetImg,reset;

function preload(){
  birdImg=loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png","bird5.png","bird6.png","bird7.png","bird8.png"); 
  pipeimg=loadImage("pipe.png");
  pipe1img=loadImage("pipe1.png");
  pipe2img=loadImage("pipe2.png");
  pipe3img=loadImage("pipe3.png");
  pipe4img=loadImage("pipe4.png");
  bgImg=loadImage("background.png");
  gameOverImg=loadImage("gameover.png");
  resetImg=loadImage("reset.png")
}

function setup() {

  bg=createSprite(200,180);
  bg.addImage("bg",bgImg);
  bg.x = bg.width /2
  bg.velocityX = -4;
     
  bird=createSprite(150,150);
  bird.scale=0.25;   
  bird.addAnimation("flying",birdImg) ;

  button = createImg('reset.png');
  button.position(170,300);
  button.size(50,50);
  button.mouseClicked(reset);

  gameOver=createSprite(200,200);
  gameOver.addImage(gameOverImg);

  invisibleGround = createSprite(200,395,400,10);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();

  score = 0;
 
}

function draw() {

  background("#ffffff");
  

 if(gameState === PLAY){
   bg.velocityX = -4;
   gameOver.visible = false;
   button.visible = false;
   bird.visible=true;
  if(keyDown("space")&& bird.y >= 100) {
    bird.velocityY = -13;
  }
   bird.velocityY = bird.velocityY + 0.8;

  if (bg.x < 0){
    bg.x = bg.width/2;
  }

   spawnObstacles();

  if(obstaclesGroup.isTouching(bird)){
    gameState=END;

  }

  if(bird.isTouching(invisibleGround)){
    gameState=END;
  }

      

  
  }
  else if(gameState === END){
   obstaclesGroup.setVelocityXEach(0);
   bg.velocityX = 0;
   bird.visible=false;
   button.visible = true;
   gameOver.visible=true;
  }
  drawSprites();
fill("red")
  textSize(20);
  text("Score: "+ score, 10,20);  
}



function spawnObstacles(){
  if (frameCount % 50 === 0){
    var obstacle = createSprite(400,165);
    
    obstacle.velocityX = -6;
 
  
     
     var rand = Math.round(random(1,5));
     switch(rand) {
       case 1: obstacle.addImage(pipeimg);
               obstacle.scale = 2;
               break;
       case 2: obstacle.addImage(pipe1img);
               obstacle.scale = 4;
               obstacle.y=210
               break;
       case 3: obstacle.addImage(pipe2img);
               obstacle.scale = 2.9;
               obstacle.y=220
               break;
       case 4: obstacle.addImage(pipe3img);
               obstacle.scale = 2;
               obstacle.y=230
               break;
      case 5: obstacle.addImage(pipe4img);
              obstacle.scale = 5;
              obstacle.y=230
               break;
      
       default: break;
     }
   
               
     
     obstacle.lifetime = 300;
    
    
    obstaclesGroup.add(obstacle);
  }
 }

 function reset(){
  gameState=PLAY
} 
 