let dots = [];
let graph;
let maxStep = 0;
let bestPath = [];
let isAnimation = false;
let dotMouse;
let magicDis = 280;
let numOfFinished = 0;
let mouseClickedTime;

class dot {
    constructor(...args) {
        if (args.length === 1) {
            this.x = random(width);
            this.y = random(height);
            this.no = args[0];
        }
        else if (args.length === 3) {
            this.x = args[0];
            this.y = args[1];
            this.no = args[2];
        }
    }

    draw() {
        let c = color(255, 5, 255);
        fill(c);
        noStroke();
        circle(this.x, this.y, 5);
    }
}

class lightning {
    constructor() {
        this.speed = 1;
    }

    drawFull(startDot, endDot) {
        strokeWeight(3);
        stroke(255, 204, 0);
        line(startDot.x, startDot.y, endDot.x, endDot.y);
    }

    draw(startDot, endDot, dur) {
        strokeWeight(3);
        stroke(255, 204, 0);
        let hypotenuse = Math.sqrt((startDot.x - endDot.x) * (startDot.x - endDot.x) + (startDot.y - endDot.y) * (startDot.y - endDot.y));
        let endX = (endDot.x - startDot.x) / hypotenuse * this.speed * dur + startDot.x;
        let endY = (endDot.y - startDot.y) / hypotenuse * this.speed * dur + startDot.y;
        // if finished
        if (Math.abs((endDot.x - startDot.x) / hypotenuse * this.speed * dur) >= Math.abs(endDot.x - startDot.x)) {
            numOfFinished++;
            endX = endDot.x;
            endY = endDot.y;
        }
        line(startDot.x, startDot.y, endX, endY);
    }
}

function drawLightning(dur) {
    let l = new lightning;
    let i = 0;
    for (; i < numOfFinished - 1; i++) {
        l.drawFull(dots[bestPath[i]], dots[bestPath[i + 1]]);
    }
    if (numOfFinished >= bestPath.length) {
        //isAnimation = false;
    }
    else {
        l.draw(dots[bestPath[i]], dots[bestPath[i + 1]], dur);
    }
}

function calculateDistanceSquare(dot1, dot2) {
    return (dot1.x - dot2.x) * (dot1.x - dot2.x) + (dot1.y - dot2.y) * (dot1.y - dot2.y);
}

function formGraphic(dis) {
    let len = dots.length, disSq = dis * dis;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (calculateDistanceSquare(dots[i], dots[j]) <= disSq) {
                graph[i][j] = 1;
                graph[j][i] = 1;
            }
        }
    }
}

function dfs(d, step, visited, curPath) {
    let len = dots.length;
    visited[d.no] = 1;
    curPath.push(d.no);
    if (maxStep < step) {
        maxStep = step;
        bestPath = curPath.slice();
    }
    for (let i = 0; i < len; i++) {
        if (graph[d.no][i] === 1 && visited[i] === 0) {
            dfs(dots[i], step + 1, visited, curPath);
        }
    }
    visited[d.no] = 0;
    curPath.pop();
}

function mouseClicked() {
    mouseClickedTime = millis();
    dotMouse = new dot(mouseX, mouseY, dots.length);
    console.log(`mouse x: ${dotMouse.x} y: ${dotMouse.y}`);
    dots.push(dotMouse);
    let len = dots.length;
    graph = Array.from({length: len}, () => Array.from({length: len}, () => 0));
    formGraphic(magicDis);
    isAnimation = true;
}

function setup() { //once
    createCanvas(screen.width, screen.height);
    for (let i = 0; i < 25; i++) {
        dots.push(new dot(i));
    }
    // dfs(dots[0], 0, visited, []);
    // console.log("max step: ", maxStep);
    // console.log("path: ", bestPath);
}

function draw() { //loop
    background(249, 236, 228);
    fill(0, 255, 0);
    text(`x: ${mouseX} y: ${mouseY}`, 50, 50);
    for (let i = 0; i < dots.length; i++) {
        dots[i].draw();
    }
    if (isAnimation) {
        dotMouse.draw();
        noFill();
        stroke(0, 255, 0);
        circle(dotMouse.x, dotMouse.y, magicDis);
        let len = dots.length;
        let visited = Array.from({length: len}, () => 0);
        dfs(dotMouse, 0, visited, []);
        // for (let i = 0; i < maxStep; i++) {
        //     strokeWeight(3);
        //     stroke(255, 204, 0);
        //     line(dots[bestPath[i]].x, dots[bestPath[i]].y, dots[bestPath[i + 1]].x, dots[bestPath[i + 1]].y);
        // }
        drawLightning(millis() - mouseClickedTime);
    }
}

