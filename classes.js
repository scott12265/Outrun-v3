class Enemy {
  constructor() {
    this.x = 0;
    this.y = -1000;
  }

  move() {
    push();
    this.y += Espeed;
    translate(this.x, this.y, 25);
    stroke(random(255), random(255), random(255));
    strokeWeight(5);
    fill(random(255), random(255), random(255));
    box(50);
    pop();
  }

  sensing() {
    if (this.y >= 900) {
      this.y = random(-2000, -12000);
      this.x = random(enemyX);
      score += 1;
      Espeed+=0.5
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
    this.a = random(360);
    this.r = random(200)
    this.g = random(200)
    this.b = random(200)
  }

  show() {
    push();
    this.y += Espeed / 1.8;
    translate(this.x, this.y, this.z);
    rotateX(-30);
    rotateY(this.a)
    fill(random(255), random(255), random(255));
    stroke(random(255), random(255), random(255));
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
    this.a = random(360);
    this.r = random(200)
    this.g = random(200)
    this.b = random(200)
  }

  show() {
    push();
    this.y += Espeed / 1.8;
    translate(this.x, this.y, this.z);
    rotateX(-30);
    rotateY(this.a)
    fill(random(255), random(255), random(255));
    stroke(random(255), random(255), random(255));
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
    fill(random(255), random(255), random(255));
    stroke(random(255), random(255), random(255));
    strokeWeight(5);
    box(50, 50, 400);
    this.y += Espeed;
    pop();

    if (this.y >= 900) {
      this.x = random(enemyX);
      this.y = random(-2000, -12000);
      score+=1
      Espeed+=0.5
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