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
  bg = loadImage('outrun.jpg')
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

  for (let i = 0; i < 50; i++) {
    building[i] = new Building();
  }

  for (let i = 0; i < 50; i++) {
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
    background("#ED7173");
    // image(outrun,10,200,outrun.width,outrun.height)
    fill("black");

    textSize(200);
    textAlign(CENTER);
    text("OUTRUN", 10, 150);
    textSize(50);
    text("Use WASD to move and space to Cump", 10, 300);
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
    background(random(255), random(255), random(255));
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
    fill(random(255), random(255), random(255))
    rotateX(270);
    text(score, 0, -300);
    pop()

    push()
    translate(x, y, z);
    fill(random(255), random(255), random(255));
    stroke(random(255), random(255), random(255));
    rotateX(score2);
    if(state === 0){
      sphere(40);
    }
    pop()

    push();
    fill(random(255), random(255), random(255));
    stroke(random(255), random(255), random(255));
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
    textAlign(CENTER);
    createCanvas(2000, 1000)
    background('green')
    fill('black')
    text('Score: ' + score, 15, -30)
    if (mouseX <= 1192 && mouseX >= 849 && mouseY >= 829 && mouseY <= 899){
       fill('red')
    }
    text('Retry', 15, 400 )
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


      if (mouseX <= 1192 && mouseX >= 849 && mouseY >= 829 && mouseY <= 899){
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


