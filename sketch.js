class Box{
    constructor(x_, y_, z_, r_) {
        this.x = x_;
        this.y = y_;
        this.z = z_;
        this.r = r_;
    }

    generate() {
        let newboxes = [];
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                for (let z = -1; z < 2; z++) {
                    let newR = this.r / 3;
                    if (Math.abs(x) + Math.abs(y) + Math.abs(z) > 1) {
                        newboxes.push(new Box(
                            this.x + x * newR,
                            this.y + y * newR,
                            this.z + z * newR,
                            newR
                        ))
                    }
                }
            }
        }
        return newboxes;
    }

    show() {
        push();
        translate(this.x, this.y, this.z);
        box(this.r);
        pop();
    }
}

sponge = [];
a = 0;

function setup() { //once
    createCanvas(400, 400, WEBGL);
    normalMaterial();
    //noFill();
    let b = new Box(0, 0, 0, 180);
    sponge.push(b);
}

function draw() { //loop
    background(50);
    rotateX(a);
    rotateY(a);
    rotateZ(a);
    for (let i = 0; i < sponge.length; i++) {
        sponge[i].show();
    }
    a += 0.01;
}

function mousePressed() {
    let next = [];
    for (let i = 0; i < sponge.length; i++) {
        let b = sponge[i].generate();
        next = next.concat(b);
    }
    sponge = next;
}
