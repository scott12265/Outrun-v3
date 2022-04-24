//player controls
function keyPressed(){
  if(state === 0){
     if(keyCode === 68  ){
    right = true
  }
  if(keyCode === 65){
    left = true
  }
  if(keyCode === 87){
    up = true 
  }
  if(keyCode === 83){
    down = true
  }
  if(keyCode === 32 && z === 37){
    vel = -25
  }
  if(key === 'j'){
    gameStatus = 1
  }
  if(keyCode === 13){
     for (let i = 0; i < enemy.length; i++) {
      enemy[i].x = random(enemyX);
      enemy[i].y = -1000;
    }

    for (let i = 0; i < enemy1.length; i++) {
      enemy1[i].x = random(enemyX);
      enemy1[i].y = random(-1000, -10000);
    }
    state = 0;
    z = 37;
    x = 0;
    state = 0;
    Jx = -600;
    Jy = -500;
    Jz = 10;
    score = 1;
    Espeed = 10;
    gameStatus = 2;
  }
  }
}

function keyReleased(){
  if(state === 0){
    if(keyCode === 68){
    right = false
  }
  if(keyCode === 65){
    left = false
  }
  if(keyCode === 87){
    up = false
  }
  if(keyCode === 83 ){
    down = false
  }
  }
}