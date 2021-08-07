//Create variables here
var dog,happyDog;
var database;
var foodS,foodStock

function preload()
{
//load images here
dogImg=loadImage("images/dogImg.png");
happyDogImg=loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database()
  createCanvas(500, 500);
  dog= createSprite(200,200,10,10);
  dog.addImage(dogImg);
  dog.scale=0.15;
  
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
  }


function draw() {  

  background(color(46,139,87));
  if (keyWentDown(UP_ARROW))
  {
  writeStock(foodS);
  dog.addImage(happyDogImg);
  }

  drawSprites();
 // display the food count and give instructions
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,100);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
 
}

function readStock(data)
{
foodS=data.val();
}

function writeStock(x)
{
if(x<=0) 
{
x=0;
}
else{
x=x-1;
}
database.ref('/').update({
Food:x
});
}