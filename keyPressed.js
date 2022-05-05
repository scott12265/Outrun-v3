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