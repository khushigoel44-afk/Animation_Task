var canvas = document.querySelector('canvas');
var startBtn = document.getElementById("startBtn");
console.log("Script loaded successfully!");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

class Star {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.alpha = Math.random(); 
        this.fade = Math.random() * 0.02 + 0.005; 
    }

    draw() {
        c.save();
        c.globalAlpha = this.alpha;  
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = "white";
        c.fill();
        c.restore();
    }

    update() {
        this.alpha += this.fade;
        if (this.alpha <= 0 || this.alpha >= 1) {
            this.fade = -this.fade; 
        }
        this.draw();
    }
}

var stars = [];
for (let i = 0; i < 200; i++) {   
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let radius = Math.random() * 1.5;  
    stars.push(new Star(x, y, radius));
}


class Spaceship {
    constructor() {
        this.width = 50;
        this.height = 30;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 20;
        this.speed = 7;
        this.dx = 0;
    }

    draw() {
        c.fillStyle = "gray";
        c.fillRect(this.x, this.y, this.width, this.height);

        c.fillStyle = "cyan";
        c.beginPath();
        c.moveTo(this.x + this.width/2, this.y - 15); 
        c.lineTo(this.x + this.width/3, this.y);      
        c.lineTo(this.x + (2*this.width/3), this.y);  
        c.closePath();
        c.fill();

        c.fillStyle = "red";
        c.fillRect(this.x - 15, this.y + 10, 15, 10);

        c.fillStyle = "red";
        c.fillRect(this.x + this.width, this.y + 10, 15, 10);
    }

    update() {
        this.x += this.dx;

        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
        }

        this.draw();
    }
}

var spaceship = new Spaceship();

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") spaceship.dx = -spaceship.speed;
    if (e.key === "ArrowRight") spaceship.dx = spaceship.speed;
});
document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") spaceship.dx = 0;
});

class Laser {
    constructor(x, y, dy, width, height, color) {
        this.x = x;
        this.y = y;
        this.dy = dy;  
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.dy;
        this.draw();
    }
}

var lasers = [];

for (let i = 0; i < 30; i++) {
    let height = 40;
    let width = 5;
    let x = Math.random() * (canvas.width - width); 
    let y = Math.random() * -canvas.height; 
    let dy = Math.random() * 4 + 2; 
    let color = "white";
    lasers.push(new Laser(x, y, dy, width, height, color));
}

let score = 0;
let gameOver = false;

function detectCollision(laser, player) {
    return (
        laser.x < player.x + player.width &&
        laser.x + laser.width > player.x &&
        laser.y < player.y + player.height &&
        laser.y + laser.height > player.y
    );
}

function animate() {
    if (!gameStarted) return;
    if (gameOver) {
        c.fillStyle = "red";
        c.font = "48px Arial";
        c.fillText("GAME OVER", canvas.width / 2 - 120, canvas.height / 2);
        c.fillStyle = "white";
        c.font = "24px Arial";
        c.fillText("Final Score: " + score, canvas.width / 2 - 70, canvas.height / 2 + 40);
        return;
    }
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => star.update());

if (Math.random() < 0.02) {  
    let height = 40;
    let width = 5;
    let x = Math.random() * (canvas.width - width); 
    let y = -height; 
    let dy = Math.random() * 4 + 2; 
    let color = "white";
    lasers.push(new Laser(x, y, dy, width, height, color));
}


    spaceship.update();

    lasers.forEach((laser, index) => {
    laser.update();

    if (detectCollision(laser, spaceship)) {
            gameOver = true;
        }

        if (laser.y > canvas.height) {
            score++;
            laser.y = -laser.height; 
            laser.x = Math.random() * (canvas.width - laser.width); 
            laser.dy = Math.random() * 4 + 2; 
        }
    });

    c.fillStyle = "white";
    c.font = "24px Arial";
    c.fillText("Dodge The Obstacles", 20, 30);

    c.fillStyle = "yellow";
    c.font = "20px Arial";
    c.fillText("Score: " + score, 20, 60);
}

    startBtn.addEventListener("click", () => {
      gameStarted = true;
      startBtn.style.display = "none"; 
      animate();
    });

animate();