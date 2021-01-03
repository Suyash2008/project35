//Create variables here
var dog,dogIm,happyDogIm 
var database 
var foodS,foodStock
function preload()
{
  //load images here
  dogIm = loadImage("images/dogImg.png")
  happyDogIm = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500,500);
  dog = createSprite(500/2,500/2)
  dog.addImage(dogIm)
  dog.scale = 0.4
  database = firebase.database()
  
}


function draw() {  
  background(46,139,87)
  foodStock = database.ref('Food')
  foodStock.on("value",readStock);
  

  drawSprites();
  fill("black")
  textSize(20)
  text("Note:Press Up arrow to feed your pet",100,100)
  text("food left "+foodS,190,50)
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogIm)
  }
  function readStock(data){
    foodS = data.val()
  }
  function writeStock(x){

    if(x<=0){
      x=0;
    }else{
      x=x-1
    }
    database.ref('/').update({
      Food:x
    })
  }
  //add styles here

}



