let cam;
let left = false;
let right = false;
let up = false;
let down = false;
let x = 0;
let y = 710;
let z = 20;
let font;
let dfont;
let speed = 7;
let Espeed = 10;
let gameStatus = 1;
let score = 1;
let threshold = 70;
let EspeedUp = 0.5;
let colorList = [
  [120, 95, 232],
  [92, 189, 81],
  [189, 101, 81],
  [139, 62, 148],
];

let Jx = -600;
let Jy = -500;
let Jz = 20;

let Sy = 0;
let Sz = -5;

let Sy2 = 0;
let Sz2 = -5;

let colorP;
let checkbox;

let enemy = [];
let building = [];
let buildingL = [];
let enemy1 = [];
let particle = []
let accel;
let vel = 0;

let state = 0;

let enemyX = [-187.5, -125, -62.5, 0, 62.5, 125, 187.5];
let buildingX = [800, 1300, 1800, 2300, 2800, -800, -1300, -1800, -2300, -2800];

let score2 = 0;
let highscore = 0;

function preload() {
  font = loadFont("Pixel-Regular.ttf");

  // song = loadSound('music.mp3')
}

function setup() {
  createCanvas(2000, 1000, WEBGL);
  let state = 0;
  cam = createCamera();
  textFont(font);
  rectMode(CENTER);
  angleMode(DEGREES);

  for (let i = 0; i < 5; i++) {
    enemy[i] = new Enemy();
  }

  for (let i = 0; i < 80; i++) {
    building[i] = new Building();
  }

  for (let i = 0; i < 80; i++) {
    buildingL[i] = new BuildingL();
  }

  for (let i = 0; i <= 1; i++) {
    enemy1[i] = new Enemy1();
  }

  

  colorP = random(colorList);
  // checkbox = createCheckbox("Dev data", false);
  cam.tilt(20);
  accel = 50 * 0.03;
  gameStatus = 1;

}

function draw() {
  // start screen code
  if (gameStatus === 1) {
    // I'M TRYING TO MAKE THE BACKROUND AN IMAGE DONT WORRY ABT THIS CODE-LAIRD
    background("#5d4ecf");
    // image(outrun,10,200,outrun.width,outrun.height)
    fill("black");
    textSize(200);
    textAlign(CENTER);
    text("OUTRUN", 10, 150);
    textSize(50);
    text("Use WASD to move and space to jump", 10, 300);
    textSize(100);
    if (mouseX <= 1153 && mouseX >= 877 && mouseY >= 593 && mouseY <= 652) {
      fill("red");
    }
    text("PLAY", 10, 500);
  }

  // main run code
  if (gameStatus === 2) {

    if(state === 1){
             for(let i = 0; i < 1000; i++){
    particle[1] = new Particle(x,y,z)
    }
    }
    camera(x, 1000, 250, x, 0, 0);
    background(20);
    vel += accel;
    z -= vel;
    if (z < 0 + 37 && x < 250 && x > -250) {
      z = 37;
      vel *= -0.6;
    }

    for (let i = 0; i < enemy.length; i++) {
      enemy[i].move();
      enemy[i].sensing();
    }

    for (let i = 0; i < building.length; i++) {
      building[i].show();
    }

    for (let i = 0; i < buildingL.length; i++) {
      buildingL[i].show();
    }

    for (let i = 0; i < enemy1.length; i++) {
      enemy1[i].show();
    }

    score2 = score2 + Espeed / 5;

    //edge sensing
    if (x < -250 || x > 250) {
      state = 0;
      setTimeout(set3, 500);
      left = false;
      right = false;
      up = false;
      down = false;
    }
    // charecter draw code
    push()
    rotateX(270);
    text(score, 0, -300);
    pop()

    push()
    translate(x, y, z);
    fill("black");
    stroke("#00ff11");
    rotateX(score2);
    if(state === 0){
      sphere(40);
    }
    pop()

    push();
    fill("black");
    stroke("#00ff11");
    strokeWeight(5);
    rect(0, 0, 500, 1000000);  
    for (let i = -187.5; i <= 187.5; i += 62.5) {
      line(i, 900, i, -10000000);
    }
    pop();

    // movement for player
    if (y > 350 && y < 800) {
      if (left === true) {
        x -= speed;
      }
      if (right === true) {
        x += speed;
      }
      if (up === true) {
        y -= speed;
      }
      if (down === true) {
        y += speed;
      }
    }
    if (y <= 350) {
      y = 351;
    }
    if (y >= 800) {
      y = 799;
    }

    // jump sensing code
    if (dist(Jx + 600, Jy, Jz, x, y, z) < threshold) {
      vel = -35;
      Espeed += 20;
      score += 10;
    }

    push();
    angleMode(DEGREES);
    fill("green");
    translate(Jx, Jy, Jz);
    square(600, 100, 100);
    pop();

    Jy += Espeed;

    if (Jy >= 900) {
      Jy = random(-500, -50000);
      Jx = random(-350, -850);
    }
  }

 if(state === 1) {
   for(let i = 0; i < particle.length; i++) {
      
      particle[1].show()
      
    }
 }
    
    // end screen code
  if(gameStatus === 3){
    x += rotationY
    background('green')
    fill('Black')
    rotateX(270)
    textSize(100)
    textFont(font)
    text('Score:' + score, 10, 100)
    if(mouseX > 877 && mouseX < 1144 && mouseY > 818 && mouseY < 867){
    fill('red')
    }
    text('Retry', 10, 500 )
  }
}

//button interaction code
function mousePressed() {
  console.log(mouseX);
  console.log(mouseY);
  if (
    mouseX <= 1153 &&
    mouseX >= 877 &&
    mouseY >= 593 &&
    mouseY <= 652 &&
    gameStatus === 1
  ) {
    gameStatus = 2;
  }

  if (
    mouseX > 877 &&
    mouseX < 1144 &&
    mouseY > 818 &&
    mouseY < 867 &&
    gameStatus === 3
  ) {
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

class Enemy {
  constructor() {
    this.x = 0;
    this.y = -1000;
  }

  move() {
    push();
    this.y += Espeed;
    translate(this.x, this.y, 25);
    stroke("red");
    strokeWeight(5);
    fill(50, 50, 50);
    box(50);
    pop();
  }

  sensing() {
    if (this.y >= 900) {
      this.y = random(-2000, -12000);
      this.x = random(enemyX);
      score += 1;
      Espeed+=1
    }

    if (dist(this.x, this.y, 25, x, y, z) < threshold) {
      console.log("you lose");
      setTimeout(set3, 500)
      Espeed = 0;
      state = 0;
      left = false;
      right = false;
      up = false;
      down = false;
      state = 0
      setScore();
    }
  }
}

class Building {
  constructor() {
    this.x = random(buildingX);
    this.y = random(800, -12000);
    this.z = random(-9000, -8000);
    this.a = random(10, 40);
  }

  show() {
    push();
    this.y += Espeed / 1.8;
    translate(this.x, this.y, this.z);
    rotateX(-30);
    // rotateY(this.a)
    fill(50, 50, 50);
    stroke("#00ff11");
    strokeWeight(8);
    box(500, 500, 20000);
    if (this.y >= 900) {
      this.y = random(-10000, -50000);
      this.x = random(buildingX);
      this.z = random(-9000, -8000);
    }
    pop();
  }
}

class BuildingL {
  constructor() {
    this.x = random(buildingX);
    this.y = random(800, -12000);
    this.z = random(-9000, -8000);
    this.a = random(-10, -40);
  }

  show() {
    push();
    this.y += Espeed / 1.8;
    translate(this.x, this.y, this.z);
    rotateX(-30);
    // rotateY(this.a)
    fill(50, 50, 50);
    stroke("#00ff11");
    strokeWeight(8);
    box(500, 500, 20000);
    if (this.y >= 900) {
      this.y = random(-10000, -50000);
      this.x = random(buildingX);
      this.z = random(-9000, -8000);
    }
    pop();
  }
}

class Enemy1 {
  constructor() {
    this.x = random(enemyX);
    this.y = random(-700, -10000);
  }
  show() {
    push();
    translate(this.x, this.y, 200);
    fill(50, 50, 50);
    stroke("#cc00ff");
    strokeWeight(5);
    box(50, 50, 400);
    this.y += Espeed;
    pop();

    if (this.y >= 900) {
      this.x = random(enemyX);
      this.y = random(-2000, -12000);
      score+=1
      Espeed+=1
    }
    if (dist(this.x, this.y, x, y) < threshold) {
      setTimeout(set3, 500)
      left = false;
      right = false;
      up = false;
      down = false;
      Espeed = 0;
      state = 0
      setScore();
      
    }
  }
}

class Particle{
  constructor(x,y,z) {
    this.x = x
    this.y = y
    this.z = z
    this.xv = random(-1,1)
    this.yv = random(-10,-1)
    this.zv = random(5,10)
  }

  show() {


    push()
    noStroke()
    stroke('red')
    fill('red')
    this.x += this.xv
    this.y += this.yv
    this.z += this.zv
    this.xv += 0.01
    this.yv += 0.01
    this.zv += 0.01
    translate(this.x, this.y, this.z)
    sphere(2)
    pop()
  }
}

function set3() {
  gameStatus = 3;
  x = 0;
  y = 0;
  z = 37
  vel = 0;
}

function setScore() {
  if (score > highscore) {
    highscore = score;
    storeItem("highscore", highscore);
  }
}

function scorePage() {
  push();
  rotateX(270);
  background(0);
  fill(255);
  textSize(50);
  text("highscore: " + getItem("highscore"), 10, 10);
  pop();
}
