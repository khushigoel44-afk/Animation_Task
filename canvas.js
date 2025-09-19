var canvas = document.querySelector('canvas');
console.log("Script loaded successfully!");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

class Ball {
    constructor(x, y, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dy = dy;  
        this.radius = radius;
        this.color = color;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        this.y += this.dy;
        this.draw();
    }
}

var balls = [];

for (let i = 0; i < 15; i++) {
    let radius = 20;
    let x = Math.random() * (canvas.width - radius * 2) + radius; 
    let y = Math.random() * -canvas.height; 
    let dy = Math.random() * 4 + 2; 
    let color = "white";
    balls.push(new Ball(x, y, dy, radius, color));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        ball.update();

        if (ball.y - ball.radius > canvas.height) {
            ball.y = -ball.radius; 
            ball.x = Math.random() * (canvas.width - ball.radius * 2) + ball.radius; 
            ball.dy = Math.random() * 4 + 2; 
        }
    });
}

animate();

