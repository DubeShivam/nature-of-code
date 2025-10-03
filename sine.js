const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

let amplitude = -100;
let dA = 5;

setInterval(() => {
  c.clearRect(0, 0, 1200, 580);

  c.translate(150, 200);

  // X-axis
  c.beginPath();
  c.moveTo(0, Math.sin(0 * Math.PI / 180));
  c.lineTo(720, Math.sin(720 * Math.PI / 180));
  c.stroke();

  c.translate(-150, -200);

  // Y-axis
  c.beginPath();
  c.moveTo(150, 0);
  c.lineTo(150, 580);
  c.stroke();

  c.translate(150, 200);

  for (let i = 0; i < 720; i++) {
    c.beginPath();
    c.arc(i, amplitude * Math.sin(i * Math.PI / 180), 1, 0, Math.PI * 2);
    c.stroke();
  }

  c.resetTransform();

  amplitude += dA;

  if (amplitude > -100 && amplitude < 100) {
    amplitude += dA;
  }
  else if (amplitude < -100) {
    dA = 5;
  }
  else if (amplitude > 100) {
    dA = -5;
  }

}, 100);
















window.addEventListener('mousemove', function (event) {
  c.beginPath();
  c.arc(event.x, event.y, 100, 0, Math.PI * 2);
  c.strokeStyle = colors[Math.floor(Math.random() * 7)];
  c.fillStyle = 'white';
  c.fill();
  c.stroke();
});