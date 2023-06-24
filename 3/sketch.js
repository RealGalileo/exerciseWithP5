let scl = 20;
let snake;
let gridX, gridY;
let food;
let isGameover = 0;
let button;

class Snake{
    constructor() {
        this.speedX = 1;
        this.speedY = 0;
        this.length = 1;
        this.body = [];
        this.body.push(new Body(0, 0));
    }

    show() {
        fill(255);
        for (let i = 0; i < this.length; ++i) {
            this.body[i].show();
        }
    }

    dir(sx, sy) {
        this.speedX = sx;
        this.speedY = sy;
    }

    gameover() {
        for (let i = 4; i < this.length; ++i) {
            if (this.body[i].x === this.body[0].x && this.body[i].y === this.body[0].y) {
                isGameover = 1;
            }
        }

        if (Math.min(this.body[0].x, this.body[0].y) < 0 || this.body[0].x >= gridX || this.body[0].y >= gridY) {
            console.log('gameover1')
            isGameover = 1;
        }
    }

    tryAgain() {
        isGameover = 0;
        this.length = 1;
        console.log('in tryagain')
        this.body = [];
        this.body.push(new Body(1, 1));
        console.log(this);
    }

    update() {
        let isEat = 0;

        if (isGameover) {
            clear();
            background(51);
            textSize(64);
            text('Game Over', 140, 260);
            fill(255);
            button.show();
        }
        else {
            button.hide();
            if (food.x === this.body[0].x && food.y === this.body[0].y) {
                isEat = 1;
                food = new Body(Math.floor(random(gridX)), Math.floor(random(gridY)));
                this.body.push(new Body(this.body[this.length - 1].x, this.body[this.length - 1].y));
            }

            for (let i = this.length - 1; i > 0; --i) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }
            this.body[0].x += this.speedX;
            // this.body[0].x = Math.max(0, this.body[0].x);
            // this.body[0].x = Math.min(gridX - 1, this.body[0].x);
            this.body[0].y += this.speedY;
            // this.body[0].y = Math.max(0, this.body[0].y);
            // this.body[0].y = Math.min(gridY - 1, this.body[0].y);

            if (isEat){
                this.length++;
            }
        }
    }
}

class Body{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        rect(this.x * scl, this.y * scl, scl, scl)
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW && (snake.speedX !== 0 && snake.speedY !== 1)) {
        snake.dir(0, -1);
    }
    else if (keyCode === DOWN_ARROW && (snake.speedX !== 0 && snake.speedY !== -1)) {
        snake.dir(0, 1);
    }
    else if (keyCode === RIGHT_ARROW && (snake.speedX !== -1 && snake.speedY !== 0)) {
        snake.dir(1, 0);
    }
    else if (keyCode === LEFT_ARROW && (snake.speedX !== 1 && snake.speedY !== 0)) {
        snake.dir(-1, 0);
    }
}

function setup() { //once
    createCanvas(600, 600);
    gridX = width / scl;
    gridY = height / scl;
    snake = new Snake();
    food = new Body(Math.floor(random(gridX)), Math.floor(random(gridY)));
    frameRate(10);
    button = createButton('Try again');
    button.position(260, 300);
    button.mousePressed(snake.tryAgain.bind(snake));
}

function draw() { //loop
    background(51);
    snake.show();
    console.log(snake.body);
    snake.gameover();
    snake.update();
    fill(255, 0, 0);
    food.show();
}




