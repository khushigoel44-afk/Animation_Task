var canvas = document.querySelector('canvas');
console.log("Script loaded successfully!");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

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

for (let i = 0; i < 50; i++) {
    let height = 40;
    let width = 5;
    let x = Math.random() * (canvas.width - width); 
    let y = Math.random() * -canvas.height; 
    let dy = Math.random() * 4 + 2; 
    let color = "white";
    lasers.push(new Laser(x, y, dy, width, height, color));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

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

    lasers.forEach(laser => {
        laser.update();

        if (lasers.y > canvas.height) {
            lasers.y = -lasers.height; 
            lasers.x = Math.random() * (canvas.width - laser.width); 
            lasers.dy = Math.random() * 4 + 2; 
        }
    });
}

animate();