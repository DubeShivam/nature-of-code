// Colliding balls

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function () {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
});

function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = function () {
    circle(this.x, this.y, this.radius, this.color)
  };

  this.update = function () {
    if (this.x + this.radius > c.canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > c.canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      this.radius += 1;
    } else if (this.radius > 4) {
      this.radius -= 1;
    }

    this.draw();
  };
}

var circles = [];
const CIRCLES = 100;
var colors = ["orange", "white", "black", "pink"];

for (let index = 0; index < CIRCLES; index++) {
  var x = Math.random() * c.canvas.width;
  var y = Math.random() * c.canvas.height;
  var radius = Math.floor(Math.random() * 51);
  var dx = (Math.random() - 0.5) * 8;
  var dy = (Math.random() - 0.5) * 8;
  var i = Math.floor(Math.random() * colors.length);

  circles.push(new Circle(x, y, dx, dy, radius, colors[i]));
  console.log(i);
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, c.canvas.width, c.canvas.height);

  for (let index = 0; index < circles.length; index++) {
    circles[index].update();
  }
}

animate();
















// Helper functions
function circle(x, y, radius, color) {
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.strokeStyle = color;
  c.fillStyle = color;
  c.fill();
  c.stroke();
}