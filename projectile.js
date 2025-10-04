const canvas = document.querySelector("canvas");
const contexts = canvas.getContext("2d");

let lx1 = 0;
let ly1 = canvas.height;
let lx2 = 100;
let ly2 = canvas.height - 100;

let balls = [];

class Ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.vx = 5;
    this.vy = -10;
    this.ax = 0;
    this.ay = 0.1;
  }

  show() {
    circle(this.x, this.y, this.radius, this.color);
  }
}

function animate() {
  requestAnimationFrame(animate);
  contexts.clearRect(0, 0, canvas.width, canvas.height);

  line(lx1, ly1, lx2, ly2);

  for (let i = 0; i < balls.length; i++) {
    balls[i].show();

    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;

    balls[i].vx += balls[i].ax;
    balls[i].vy += balls[i].ay;

    if (
      balls[i].x + balls[i].radius >= canvas.width ||
      balls[i].x - balls[i].radius <= 0
    ) {
      balls[i].vx = -balls[i].vx;
    }
    if (
      balls[i].y + balls[i].radius >= canvas.height ||
      balls[i].y - balls[i].radius <= 0
    ) {
      balls[i].vy = -balls[i].vy;
    }
  }
}

animate();

canvas.addEventListener("mousemove", function (event) {
  if (event.clientX < 100 && event.clientY > 500) {
    lx2 = event.clientX;
    ly2 = event.clientY;
  }
});

canvas.addEventListener("click", function (event) {
  let b = new Ball(20, canvas.height - 20, 20, "green");

  b.ay = b.vx/ly2 * lx2;
  console.log(b.ay);
  balls.push(b);
});





// Helper functions
function between(lower, upper, num) {
  if(num > lower && num < upper) {
    return true;
  }
  else {
    return false;
  }

}

function circle(x, y, radius, color) {
  contexts.beginPath();
  contexts.arc(x, y, radius, 0, Math.PI * 2);
  contexts.fillStyle = color;
  contexts.fill();
}

function line(x1, y1, x2, y2) {
  contexts.beginPath();
  contexts.moveTo(x1, y1);
  contexts.lineTo(x2, y2);
  contexts.stroke();
}
