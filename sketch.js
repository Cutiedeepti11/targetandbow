var playground,playground2,bow,bow2,blueballoonimage,greenballoonimage;

var pinkballoonimage,redballoonimage,arrow,arrow2,edges;

var gamestate = "aim";

var score = 0;

function preload() {
  //load your images here 
  playground2 = loadImage("grass.jpeg");
  bow2 = loadImage("bow0.png");
  blueballoonimage = loadImage("target1.png");
  greenballoonimage = loadImage("target1.png");
  pinkballoonimage = loadImage("target1.png");
  redballoonimage = loadImage("target1.png");
  arrow2 = loadImage("arrow0.png");
}

function setup() {
  //add code here
  
  createCanvas(600,600);
  
  playground = createSprite(400,100,20,20);
  playground.addImage(playground2);
  playground.velocityX = -2;
  playground.scale = 1.5;
  
  bow = createSprite(500,200,20,20);
  bow.addImage(bow2);
  
  arrow = createSprite(450,200,20,20);
  arrow.addImage(arrow2);
  arrow.scale = 0.25;
  
  balloonGroup1 = new Group();
  balloonGroup2 = new Group();
  balloonGroup3 = new Group();
  balloonGroup4 = new Group();
  
  arrow.setCollider("rectangle",-100,0,25,50)
  //arrow.debug = true;
}

function draw() {
  //add code here
  background(220);
  
  edges = createEdgeSprites();
  
  if (playground.x <= playground.width/3) {
    playground.x = playground.width/2;
  }
  
  if(keyDown("space")){
    gamestate = "released";
  }  
    
  if(gamestate === "released" && arrow.collide (edges)){
    gamestate = "aim";
  }
  
  if(gamestate === "aim"){
    bow.y = mouseY;
    arrow.y = bow.y;
    arrow.x = bow.x;
  }
  if(gamestate === "released"){
    arrow.velocityX = -8;
    arrow.velocityY = 0.98; 
  }
  
  if(arrow.isTouching (balloonGroup1)){
    gamestate = "aim";
    score = score+1;
    balloonGroup1.destroyEach();
  }
  
  if(arrow.isTouching (balloonGroup2)){
    gamestate = "aim";
    score = score+2;
    balloonGroup2.destroyEach();
  }  
  
  if(arrow.isTouching (balloonGroup3)){
    gamestate = "aim";
    score = score+2;
    balloonGroup3.destroyEach();
  }
  
  if(arrow.isTouching (balloonGroup4)){
    gamestate = "aim";
    score = score+3;
    balloonGroup4.destroyEach();
  }  
  
  spawnEverything();
  
  drawSprites();
  fill("white");
  textSize (20);
  text("Score: "+score,10,25);
}

function spawnEverything(){
  if(frameCount % 80 === 0){
    
    var randomX1 = Math.round(random(1,350));
    var randomX2 = Math.round(random(1,350));
    var randomX3 = Math.round(random(1,350));
    var randomX4 = Math.round(random(1,350));
    var balloonreal1 = Math.round(random(1,4));
    var balloonreal2 = Math.round(random(1,4));
    
    var balloon1 = createSprite(randomX1,650,20,20);
    var balloon3 = createSprite(randomX2,650,20,20);
    var balloon2 = createSprite(randomX3,-100,20,20);
    var balloon4 = createSprite(randomX4,-100,20,20);
    
    if(balloonreal1 === 1||balloonreal2 === 1){
      balloon1.velocityY = -4;
    }
    if(balloonreal1 === 2||balloonreal2 === 2){
      balloon2.velocityY = 4;
    }
    if(balloonreal1 === 3||balloonreal2 === 3){
      balloon3.velocityY = -8;
    }
    if(balloonreal1 === 4||balloonreal2 === 4){
      balloon4.velocityY = 8;
    }
    balloon1.lifetime = 200;
    balloon2.lifetime = 200;
    balloon3.lifetime = 200;
    balloon4.lifetime = 200;
    
    balloon1.addImage(blueballoonimage);
   balloon1.scale=0.4;
    
    balloon2.addImage(redballoonimage);
     balloon2 .scale=0.3;
    
    balloon3.addImage(greenballoonimage);
     balloon3.scale=0.3;
    
    balloon4.addImage(pinkballoonimage);
     balloon4.scale=0.4  ;
    balloon1.depth = arrow.depth;
    balloon2.depth = arrow.depth;
    balloon3.depth = arrow.depth;
    balloon4.depth = arrow.depth;
    
    balloonGroup1.add(balloon1);
    balloonGroup2.add(balloon2);
    balloonGroup3.add(balloon3);
    balloonGroup4.add(balloon4);
    
    console.log (balloonreal1);
  }
}