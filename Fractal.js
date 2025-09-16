const canvas = document.querySelector("canvas");
const contexts = canvas.getContext("2d");

let angle = 45;
let len = 200;

contexts.translate(canvas.width / 2, canvas.height);

function branch(len, angle) {
  contexts.beginPath();
  contexts.moveTo(0, 0);
  contexts.lineTo(0, -len);
  contexts.stroke()

  contexts.translate(0, -len);

  if (len > 10) {
    contexts.save();
    contexts.rotate((angle * Math.PI) / 180);
    branch(len * 0.8, angle);
    contexts.restore();

    contexts.save();
    contexts.rotate((-angle * Math.PI) / 180);
    branch(len * 0.8, angle);
    contexts.restore();
  }
}

branch(len, angle);

function animate() {
   requestAnimationFrame(animate);

  angle = document.getElementById('angle-setter').value
  contexts.setTransform();

  contexts.clearRect(0, 0, canvas.width, canvas.height);

  contexts.translate(canvas.width / 2, canvas.height);
  
  branch(len, angle);

 
}
animate();


// canvas.addEventListener('mousemove', function(event) {
//   for(let i = 0; i < 360; i++) {
//     if(i == event.clientX) {
//       angle = event.clientX;
//       break;
//     }
//   }

//   contexts.setTransform();

//   contexts.clearRect(0, 0, canvas.width, canvas.height);

//   contexts.translate(canvas.width / 2, canvas.height);
  
//   branch(len, angle);
// });