const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const gravity = 1;
const friction = 0.9;

function Circle(x, y, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  };

  this.update = function () {
    this.y += this.dy;

    if(this.y + this.radius + 5 >= c.canvas.height) {
        this.dy = -this.dy * friction;
    }
    else {
        this.dy += gravity;
    }

    console.log(this.y + ' ' +this.dy);

    this.draw();
  };
}

var circle = new Circle(400, 200, 2, 20, 'green');

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, c.canvas.width, c.canvas.height);

  circle.update();
}

animate();
