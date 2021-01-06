const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

///////////////////////////////////////////
///////////////////////////////////////////
            const RADIUS = 20;
            const VELOCITY = 3;
            const CAPACITY = 4;
            const BALLS = 100;
///////////////////////////////////////////
///////////////////////////////////////////


let rnd = function(from, to) {
    return Math.floor(Math.random()*(to-from+1)+from);
}

class Circle {
    constructor(x = rnd(RADIUS, canvas.width-RADIUS), y = rnd(RADIUS, canvas.height-RADIUS), radius = RADIUS, velocity = VELOCITY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        let direction = [-1,1];
        let m = rnd(-velocity, velocity);
        let n = Math.sqrt((velocity**2)-(m**2));
        this.dX = m*direction[rnd(0,1)];
        this.dY = n*direction[rnd(0,1)];
        this.highligth = false;
    }

    setHighlight(bool) {
        this.highligth = bool;
    }

    update() {
        this.move();
        this.draw();
    }

    move() {
        if (this.x <= this.radius || this.x >= canvas.width-this.radius) {
            this.dX *= -1;
        }
        if (this.y <= this.radius || this.y >= canvas.height-this.radius) {
            this.dY *= -1;
        }
        this.x+=this.dX
        this.y+=this.dY
    }

    collision(circle) {
        let d = Math.sqrt(Math.pow(circle.x-this.x, 2) + Math.pow(circle.y-this.y, 2));
        return d < this.radius+circle.radius;
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        if (this.highligth){
            ctx.fillStyle = "red";
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            ctx.fill();
        } else {
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        }
        ctx.stroke();
        ctx.closePath();
    }
}

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    contains(circle) {
        return (circle.x >= this.x &&
                circle.x <= this.x+this.width &&
                circle.y >= this.y &&
                circle.y <= this.y+this.height);
    }

    static draw(x, y, width, height) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.rect(x, y, width, height);
        ctx.stroke();
        ctx.closePath();
    }
}

class qtree {
    constructor(boundary) {
        this.capacity = CAPACITY;
        this.boundary = boundary;
        this.x = boundary.x;
        this.y = boundary.y;
        this.width = boundary.width;
        this.height = boundary.height;
        this.array = [];
        this.devided = false;
    }

    insert(circle) {
        if(!this.boundary.contains(circle)) {
            return;
        }
        if(this.array.length < this.capacity) {
            this.array.push(circle);
        } else {
            if (!this.devided) {
                this.devide();
            }
            this.topLeft.insert(circle);
            this.topRight.insert(circle);
            this.downLeft.insert(circle);
            this.downRight.insert(circle);
        }
    }

    devide() {
        let tl = new Rectangle(this.x, this.y, this.width / 2, this.height / 2);
        this.topLeft = new qtree(tl);
        let tr = new Rectangle(this.x + this.width / 2, this.y, this.width / 2, this.height / 2);
        this.topRight = new qtree(tr);
        let dl = new Rectangle(this.x, this.y + this.height / 2, this.width / 2, this.height / 2);
        this.downLeft = new qtree(dl);
        let dr = new Rectangle(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, this.height / 2);
        this.downRight = new qtree(dr);
        this.devided = true;
    }

    find(circle, found = []) {
        if (!this.boundary.contains(circle)) {
            return found;
        }

        for (let c of this.array) {
            if (circle.collision(c)) {
                found.push(c);
            }
        }
        if(this.devided) {
            this.topLeft.find(circle, found);
            this.topRight.find(circle, found);
            this.downLeft.find(circle, found);
            this.downRight.find(circle, found);
        }
        return found;

    }

    draw() {
        Rectangle.draw(this.x, this.y, this.width, this.height);
        if (this.devided) {
            this.topLeft.draw();
            this.topRight.draw();
            this.downLeft.draw();
            this.downRight.draw();
        }
    }
}

class Main {
    constructor() {
        this.circles = [];
        this.boundary = new Rectangle(0, 0, canvas.width, canvas.height);
        this.qt = new qtree(this.boundary);
        this.click = false;
        this.drag = false;
        this.mouseX;
        this.mouseY;
    }

    addCircles(n=1) {
        for (let i=0;i<n;i++){
            this.addRndCircle();
        }
    }

    addRndCircle() {
        this.circles.push(new Circle());
    }

    addCircle(x, y) {
        this.circles.push(new Circle(x, y));
    }

    update() {
        let that = this;
        canvas.addEventListener("mousedown", function(e) {
            that.click = true;
        });
        canvas.addEventListener("mousemove", function(e) {
            if (that.click) {
                that.drag = true;
                that.mouseX = e.clientX;
                that.mouseY = e.clientY;
            }
        });
        canvas.addEventListener("mouseup", function(e) {
            that.click = false;
            that.drag = false;
        });
        
        if (this.drag){
            this.addCircle(this.mouseX, this.mouseY, 20);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.qt = new qtree(this.boundary);
        for(let circle of this.circles){
            circle.update();
            circle.setHighlight(false);
            this.qt.insert(circle);
        }
        this.collision();
        this.qt.draw();
        window.requestAnimationFrame(()=>this.update());
    }

    collision() {
        for (let c of this.circles) {
            let circles = this.qt.find(c);
            for (let circle of circles) {
                if (circle!=c && c.collision(circle)) {
                    circle.setHighlight(true);
                }
            }
        }
    }

}

let main = new Main();
main.addCircles(BALLS);
main.update();

