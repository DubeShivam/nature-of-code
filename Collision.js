const canvas = document.querySelector("canvas");
const contexts = canvas.getContext("2d");

// let variable = document.querySelector('#ball-collision-sound');
// variable.play();

let collisions = 0;

let audio = new Audio();
audio.src = "Ball-collision.mp3";

document.addEventListener("click", function (e) {
  audio.play();
  audio.muted = true;
});


class Block {
  constructor(x, y, mass, width, v) {
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.width = width;
    this.v = v;
  }

  draw(color) {
    contexts.beginPath();
    contexts.rect(this.x, this.y, this.width, this.width);
    contexts.fillStyle = color;
    contexts.fill();
    contexts.strokeStyle = "black";
    contexts.stroke();
  }

  hasReachedCorners() {
    if(this.x <= 0) {
      return true;
    }
    else if(this.x + this.width >= canvas.width) {
      return true;
    }
    else {
      return false;
    }
  }

  newSpeed(other) {
    let newV = (this.mass-other.mass)/(this.mass + other.mass) * this.v + (2 * other.mass/(this.mass+other.mass)) * other.v;
    return newV;
  }

  collided(other) {
    if(this.x + this.width <= other.x || this.x >= other.x + other.width) {
      return false;
    }
    else {
      return true;
    }
  }

  update() {
    this.x += this.v;
  }
}

let block1 = new Block(240, canvas.height-40, 1, 40, 1);
let block2 = new Block(840, canvas.height-200, 500, 200, -10);

function animate() {
  requestAnimationFrame(animate);
  contexts.clearRect(0, 0, canvas.width, canvas.height);

  if(block1.collided(block2)) {
    audio.muted = false;
    audio.play();

    const v1 = block1.newSpeed(block2);
    const v2 = block2.newSpeed(block1);
    block1.v = v1;
    block2.v = v2;

    console.log(collisions++);
  }

  if(block1.hasReachedCorners()) {
    block1.v = -block1.v;
  }
  if(block2.hasReachedCorners()) {
    block2.v = -block2.v;
  }

  block1.update();
  block2.update();

  block1.draw('blue');
  block2.draw('green');
}

animate();
