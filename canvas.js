var canvas = document.querySelector('canvas');
console.log("Script loaded successfully!");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

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

for (let i = 0; i < 15; i++) {
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