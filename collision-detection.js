const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

let mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});


function getDistance(x1, y1, x2, y2) {
    deltaX = x2 - x1;
    deltaY = y2 - y1;

    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}

function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
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

    this.draw();
  };
}

var circle1 = new Circle(600, 250, 60, 'green');
var circle2 = new Circle(500, 200, 20, 'black');

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, c.canvas.width, c.canvas.height);

  circle1.update();
  circle2.x = mouse.x;
  circle2.y = mouse.y;
  circle2.update();

  if(getDistance(circle1.x, circle1.y, circle2.x, circle2.y) <= circle1.radius + circle2.radius) {
      circle1.color = 'black';
  }
  else {
      circle1.color = 'green';
  }
}

animate();
