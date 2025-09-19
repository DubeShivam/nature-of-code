const canvas = document.querySelector("canvas");
const contexts = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let originX = 150;
let originY = 150;
//let radius = 50;
let angle = 0;
let wave = [];
let n;


function animate() {
    requestAnimationFrame(animate);
    contexts.clearRect(0, 0, canvas.width, canvas.height);
    contexts.translate(originX, originY);

    let x = 0;
    let y = 0;

    for(let i = 0; i < 3; i++) {
        // Coordinates of rotating particle
        let prevX = x;
        let prevY = y;

        n = i * 2 + 1;
        let radius = 50 * (4 / (n * Math.PI));
        x += radius * Math.cos(n * angle);
        y += radius * Math.sin(n * angle);
    
        // Circle
        circle(prevX, prevY, radius);
        // Rotating particle
        point(x, y);
        // Radius
        line(prevX, prevY, x, y);
    }
    wave.unshift(y);
    // Wave connecting line
    line(x, y, 0 + 100, wave[0]);

    contexts.beginPath();
    for (let i = 0; i < wave.length; i++) {
        contexts.arc(i + 100, wave[i], 0.4, 0, Math.PI * 2, false);
        contexts.stroke();
    }
    contexts.closePath();

    if(wave.length > 200) {
        wave.pop();
    }

    angle -= 0.05;
    contexts.translate(-originX, -originY);
}

animate();

// Helper functions
function circle(x, y, radius) {
    contexts.beginPath();
    contexts.arc(x, y, radius, 0, Math.PI * 2, false);
    contexts.stroke();
}

function point(x, y) {
    contexts.beginPath();
    contexts.arc(x, y, 0.5, 0, Math.PI * 2, false);
    contexts.fill();
    contexts.stroke();
}

function line(x1, y1, x2, y2) {
    contexts.beginPath();
    contexts.moveTo(x1, y1);
    contexts.lineTo(x2, y2);
    contexts.stroke();
}