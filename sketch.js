//varible for the game 
var monkey , monkey_running,eatSound;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground;
var invisibleground;
var score= 0;
var survivaltime = 0;
var gameOver = "NICE TEY !" , gameOverSound;
var jumpSound;
var Play = 1;
var End=0;
var gameState=1;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  gameOverSound = loadSound("gameOver sound. mp3.wav")
  
  jumpSound = loadSound("platform-game-jump-sound-effect-86474610.mp3")
  
  eatSound = loadSound("mixkit-animal-eating-herb-2241.wav")
  
}



function setup() {
  
  createCanvas(400,400)
  
  //to create the invible ground for support to monkey to stand  
  invisibleground=createSprite(400,350,900,10)
  invisibleground.visible= false
  
  //To craeate monkey
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("Moving",monkey_running)
  monkey.scale = 0.1;
  //monkey.debug= true;
  monkey.setCollider("rectangle",0,0,390,550)
  
  
  ground = createSprite(400,350,900,10);
  
  ground.velocityX=-4;
  ground.x = ground.width/2
 
  Foodgroup = new Group()
   obstacleGroup = new Group()
  
}


function draw() {

  background("white")
  textSize(20)
  fill("black");
  text("Survival time:"+score,200,20);
  monkey.collide(invisibleground)

  if(gameState == Play){
     
  food();
  obstacles();
  
  //survivaltime = Math .ceil(frameCount/frameRate)
    score = score + Math.round(getFrameRate()/60);
    
     if(ground.x<0){
    
    ground.x = ground.width/2
     }
    
    if(keyDown("space")&&monkey.y >= 100){
    monkey.velocityY=-10;
    jumpSound.play();
  }
    
    monkey.velocityY= monkey.velocityY+0.4
    
     if(monkey.isTouching(Foodgroup)){
    eatSound.play();
    score = score+1;
    Foodgroup.destroyEach();
}
   
  if(obstacleGroup.isTouching(monkey)){
    gameState = End ;
    obstacleGroup.destroyEach();
    gameOverSound.play();
}
    
    
     }
 
  if(gameState == End){
     Foodgroup.destroyEach();
     obstacleGroup.destroyEach();
    ground.velocityX=0;
    stroke("red")
    textSize(20);
    text("GAME OVER :"+gameOver,100,200)
    text("# press R to restart the game",100,250) 
    monkey.velocityY=0;
    monkey.Y=100;
    
   if(keyDown("r")){
    Foodgroup.destroyEach()
    obstacleGroup.destroyEach()
    monkey.changeAnimation("monkey",monkey_running)
    score= 0;
    gameState= Play;
     
     }
  }
  
  drawSprites();


}

function food(){
  
  if(frameCount % 80 == 0){
    
  
     banana = createSprite(640,200, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1   ;
    banana.velocityX =-5;           
    banana.lifetime = 150;
    Foodgroup.add(banana);
    
  
}
}


function obstacles(){
  
  if(frameCount % 90 == 0){
     
       obstacle = createSprite(400,330,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle)
    //obstacle.debug= true
    obstacle.setCollider("circle", 0, 0, 180);
     }
}

