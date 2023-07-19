class drop {
    constructor() {
        this.x = random(width);
        this.y = random(-200, 0);
        this.speed = random(16);
        this.z = map(this.speed, 0, 16, 1, 3);
        this.r = random(160, 255);
        this.g = random(160, 255);
        this.b = random(160, 255);
    }

    newColor() {
        this.r = this.r > 255 ? random(160, 255) : this.r + 1;
        this.g = this.g > 255 ? random(160, 255) : this.g + 1;
        this.b = this.b > 255 ? random(160, 255) : this.b + 1;
    }

    fall() {
        this.newColor();
        this.y += this.speed;
        if (this.y > height) {
            this.y = random(-200, 0);
        }
    }

    draw() {
        strokeWeight(this.z);
        line(this.x, this.y, this.x, this.y + this.speed);
        stroke(this.r, this.g, this.b);
    }
}

let drops = [];

function setup() { //once
    createCanvas(600, 400);
    for (let i = 0; i < 500; i++) {
        drops.push(new drop());
    }
}

function draw() { //loop
    background(249, 236, 228);
    for (let i = 0; i < drops.length; i++) {
        drops[i].draw();
        drops[i].fall();
    }
}