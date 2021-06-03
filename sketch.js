var bg, bgImg;
var ground;
var player, playerImg;
var corona, coronaImg;
var start, startImg;
var heart;
var playButton, playImg;
var immune, imGroup;
var obstacle, obstacleImg ,obGroup;
var mask1, mask1Img, mask2, mask2Img;
var sanitizer, sanitizerImg;
var vaccine, vaccineImg;
var sanitGroup,maskGroup;
var gameOver, gameOverImg, gameOverS;
var jumpS, hurtS, gameStartS;

var life = 3;
var score = 0;

var gameState = "start";

function preload(){
  bgImg = loadImage("road4.jpg");
  coronaImg = loadImage("corona.png");
  startImg = loadImage("bg1.png");
  heart = loadImage("heart.png");
  playImg = loadImage("playButon.png");
  playerImg = loadAnimation("man1.png","man2.png","man3.png","man4.png","man5.png","man6.png","man7.png","man8.png");
  obstacleImg = loadImage("crowd1.png");
  mask1Img = loadImage("mask1.png");
  mask2Img = loadImage("mask2.png");
  sanitizerImg = loadImage("sanitizer.png");
  vaccineImg = loadImage("vaccine.png");
  gameOverImg = loadImage("gameover.png");
  gameOverS = loadSound("gameOversound.wav");
  jumpS = loadSound("jumpSound.wav");
  hurtS = loadSound("hurtS.wav");
  gameStartS = loadSound("gameStartS.wav");
 
}

function setup(){
  createCanvas(1400,700);

  imGroup = new Group();
  obGroup = new Group();
  maskGroup = new Group();
  sanitGroup = new Group();


  bg = createSprite(700,350,1400,700);
  bg.addImage("back",bgImg);
  bg.scale = 2;
  bg.velocityX = -7;
  bg.visible = false;
 
  start = createSprite(700,350,1400,700);
  start.addImage("starting",startImg);
  start.scale = 0.8;

  corona= createSprite(120,335,1400,700);
  corona.addImage("Covid-19",coronaImg);
  corona.scale = 0.4;
  corona.visible = false;

  playButton = createSprite(700,350,200,100);
  playButton.addImage("play",playImg);
  playButton.scale = 0.6;

  ground = createSprite(700,370,1400,25);
  ground.visible = false;

  player = createSprite(250,335,30,80);
  player.addAnimation("Insaan",playerImg);
  player.scale = 0.3;
  player.visible = false;

  gameOver = createSprite(700,450,50,50);
  gameOver.addImage("khelkhatam",gameOverImg);
  gameOver.visible = false;
}

function draw(){
  background(0);

  drawSprites();

  fill("black");
  textSize(40);
  text("SCORE : "+score,1000,50);

  if(gameState === "start"){
    if(mousePressedOver(playButton)){
      gameState = "play";
    }
 }
  
if(gameState === "play"){
    
    gameStartS.play();

    start.visible=false;
    playButton.visible=false;
    bg.visible = true;
    player.visible = true;
    corona.visible = true;

    corona.y=player.y;

    if(bg.x<0){
      bg.x=bg.width/2;
    }

  if(keyDown("space")){
    jumpS.play();
    
    player.velocityY = -10;
  }

  player.velocityY = player.velocityY+0.5;
  player.collide(ground);

  var num = Math.round(random(1,3));

  if(num === 2){
    createObstacles();

  }
  
  if(num === 3){
    createMask();

  }
  
  if(num === 1){
    createSanitizer();

  }
  createVaccine();

  if(player.isTouching(obGroup)){
    obGroup.destroyEach();
    life = life-1;
    hurtS.play();

  }

  if(player.isTouching(imGroup)){
    imGroup.destroyEach();
    score = score+10;

  }

  if(player.isTouching(maskGroup)){
    maskGroup.destroyEach();
    score = score+10;

  }

  
  if(player.isTouching(sanitGroup)){
    sanitGroup.destroyEach();
    score = score+10;

  }

  if(life === 3){
    image(heart,50,40,70,70);
    image(heart,120,40,70,70);
    image(heart,190,40,70,70);

  }

  if(life === 2){
    image(heart,50,40,70,70);
    image(heart,120,40,70,70);

  }

  if(life === 1){
    image(heart,50,40,70,70);
  
  }
  if(life === 0){
    gameOverS.play();
    gameState="end";

  }
}

  if(gameState === "end"){
    bg.velocityX = 0;
    player.velocityY = 0;
    player.x = 700;
    corona.x = 700;
    corona.y = player.y-25;

    gameOver.scale = 1.5;

    obGroup.setVelocityXEach(0);
    imGroup.setVelocityXEach(0);
    maskGroup.setVelocityXEach(0);
    sanitGroup.setVelocityXEach(0);

    gameOver.visible = true;

  }

}

function createObstacles(){
  if(frameCount % 200 === 0){
    obstacle = createSprite(1400,325,30,80);
    obstacle.addImage("mushkil",obstacleImg);
    obstacle.scale = 0.8;
    obstacle.velocityX = -7;
    obGroup.add(obstacle);

  }
}

function createImmunity(){
  if(frameCount % 400 === 0){
    immune = createSprite(1400,325,30,80);
    immune.shapeColor = "green";
    immune.velocityX = -7;
    imGroup.add(immune);

  }
}

function createMask(){
  if(frameCount % 200 === 0){
    mask = createSprite(1400,350,30,80);
    mask.addImage("mouser",mask1Img);
    mask.velocityX = -7;
    mask.scale=0.4;
    maskGroup.add(mask);
  }
}

function createSanitizer(){
  if(frameCount % 200 === 0){
    sanitizer = createSprite(1400,325,30,80);
    sanitizer.addImage("shudhta",sanitizerImg);
    sanitizer.velocityX = -7;
    sanitizer.scale=0.2;
    sanitGroup.add(sanitizer);
  }
}

function createVaccine(){
  if(frameCount % 5000 === 0 ){
    vaccine = createSprite(1400,325,30,80);
    vaccine.addImage("injection",vaccineImg);
    vaccine.velocityX = -7;

  }
}
