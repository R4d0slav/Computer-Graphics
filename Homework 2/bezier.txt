const canvas = document.getElementById('canvas');
const inputColor = document.getElementById("favcolor");
const button = document.getElementById('myButton');
const buttonColor = document.getElementById('setColor');
const buttonAdd = document.getElementById("add");
const buttonRemove = document.getElementById("remove");
const curveColor = document.getElementById("curveColor");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');
button.style.display = 'none';
buttonColor.style.display = 'none';
inputColor.style.display = "none";


class Point {
    constructor(x, y, color="red") {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    setColor(color) {
        this.color = color;
    }
}

class ApproximatedPoint extends Point {
    setColor(color) {
        this.color = color;
    }
    draw(color = "red") {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, Math.PI*2, false);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}

class InterpolatedPoint extends Point {
    setColor(color) {
        this.color = color;
    }
    draw(color = "red") {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, 6, 6);
        ctx.closePath();
        ctx.stroke();
    }
}


class AnglePoint {
    constructor(p, c, op, color="black") {
        this.p = p;
        this.c = c;
        this.op = op;
        this.color = color;
    }

    static getDistance(p, c){
        return Math.sqrt(Math.pow(Math.abs(c.x-p.x),2)+Math.pow(Math.abs(c.y-p.y),2));
    }

    static oppositePoint(p, c) {
        let vx = p.x - c.x;
        let vy = p.y - c.y;
        let distCto1 = Math.pow((Math.pow(vx, 2.0)+Math.pow(vy,2.0)),0.5);
        let distRatio = AnglePoint.getDistance(p, c) / distCto1;
        let x = distRatio * vx;
        let y = distRatio * vy;
        let p0 = new ApproximatedPoint(c.x-x+4, c.y-y+4);
        return p0;
    }

    draw(color = "red") {
        this.c.draw();
        this.p.draw(color);
        this.op.draw(color);
        ctx.strokeStyle = "gray";
        ctx.setLineDash([5,5]);
        ctx.beginPath();
        ctx.moveTo(this.p.x,this.p.y);
        ctx.lineTo(this.op.x,this.op.y);
        ctx.closePath();
        ctx.stroke();

    }
}

class Curve {
    constructor(p0, p1, p2, p3, color="black") {
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.color = color;
    }

    cubicBezier(p0, p1, p2, p3, t) {
        let pFinal = {};
        pFinal.x = Math.pow(1-t,3)*p0.x+
                    Math.pow(1-t,2)*3*t*p1.x+
                    (1-t)*3*t*t*p2.x+
                    t*t*t*p3.x;
        pFinal.y = Math.pow(1-t,3)*p0.y+
                    Math.pow(1-t,2)*3*t*p1.y+
                    (1-t)*3*t*t*p2.y+
                    t*t*t*p3.y;
        return pFinal;
    }

    draw(color = this.color) {
        ctx.fillStyle = color;
        for (let t=0;t<=1;t+=0.001){
            let c = this.cubicBezier(this.p0, this.p1, this.p2, this.p3, t);
            ctx.fillRect(c.x, c.y, 1, 1);
        }
        ctx.strokeStyle = "gray";
        ctx.setLineDash([5,5]);
        ctx.moveTo(this.p3.x,this.p3.y);
        ctx.lineTo(this.p2.x,this.p2.y);
        ctx.stroke();
    }

}



class Drawing {
    constructor() {
        this.select = false;
        this.list = [];
        this.index = 0;
        this.list.push([]);
        this.event();
    }

    setColor(color) {
        for (let i=0;i<this.list[this.index].length;i++){
            this.list[this.index][i].color = color;
        }
        this.refreshAll();
    }

    new() {
        this.list.push([]);
        this.index++;
    }

    delete() {
        this.list.splice(this.index--, 1);
        if (this.index<=0){
            this.index = 0;
            this.list.push([]);
        }
        this.refreshAll();
    }

    refreshAll() {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i=0;i<this.list.length;i++){
            for (let j=0;j<this.list[i].length;j++){
                this.list[i][j].draw();
                if (this.list[i].length>1 && j>0) {
                    let s = new Curve(this.list[i][j-1].c, this.list[i][j-1].op, this.list[i][j].p, this.list[i][j].c, this.list[i][j].color);
                    if (i!=this.index){ s.draw("gray"); }
                    else { s.draw(); }
                }
            }
        }
    }

    refresh(points, color = "black") {
        for (let i=0;i<points.length;i++) {
            points[i].draw(); 
            if (points.length>1 && i>0) {
                let s = new Curve(points[i-1].c, points[i-1].op, points[i].p, points[i].c, points[i].color);
                s.draw();
            }
        }
    }

    getPoints() {
        return this.list[this.index];
    }

    static drawT(p1, p2) {
        ctx.strokeStyle = "gray";
        ctx.setLineDash([5,5]);
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }

    click(){
        console.log("CLICK");
    }    

    event() {
        let drag = false;
        let click = false;
        let change = false;
        let startPoint;
        let oPointMove = false;
        let centerMove = false;
        let ind;
        let p2;
        let point;
        let spiral;
        let that = this;

        curveColor.addEventListener("input", function (){
            d.setColor(curveColor.value);
        });

        canvas.addEventListener("mousedown", function(e) {
            inputColor.style.display = "none";
            button.style.display = "none";
            buttonColor.style.display = "none";
            if (!drag){
                for (let k=0;k<that.list.length;k++){
                    for (let h=0;h<that.list[k].length;h++){
                        let temp2 = that.list[k][h];
                        if ((temp2.p.x-10<e.clientX && e.clientX<temp2.p.x+10 && temp2.p.y-10<e.clientY && e.clientY<temp2.p.y+10) || 
                            (temp2.op.x-10<e.clientX && e.clientX<temp2.op.x+10 && temp2.op.y-10<e.clientY && e.clientY<temp2.op.y+10) ||
                            (temp2.c.x-10<e.clientX && e.clientX<temp2.c.x+10 && temp2.c.y-10<e.clientY && e.clientY<temp2.c.y+10)) {
                            that.index = k;
                        }
                    }
                }
                startPoint = new InterpolatedPoint(e.clientX, e.clientY);  
                startPoint.draw("blue");
                for (var i=0;i<that.list[that.index].length;i++){
                    let temp = that.list[that.index][i];
                    if (temp.p.x-10<e.clientX && e.clientX<temp.p.x+10 && temp.p.y-10<e.clientY && e.clientY<temp.p.y+10){
                        ind = i;
                        change = true;
                    } 
                    else if (temp.op.x-10<e.clientX && e.clientX<temp.op.x+10 && temp.op.y-10<e.clientY && e.clientY<temp.op.y+10){
                        ind = i;
                        change = true;
                        oPointMove = true;
                    }
                    else if (temp.c.x-10<e.clientX && e.clientX<temp.c.x+10 && temp.c.y-10<e.clientY && e.clientY<temp.c.y+10){
                        ind = i;
                        change = true;
                        centerMove = true;
                    }
                }
            }
            click = true;
            drag = false;  
        });

        canvas.addEventListener("mouseup", function(e) {
            if (change && click && !drag) {
                for (let i=0;i<that.list[that.index].length;i++){
                    if (that.list[that.index][i].c.x-10 < e.clientX && e.clientX < that.list[that.index][i].c.x+10 && that.list[that.index][i].c.y-10 < e.clientY && e.clientY < that.list[that.index][i].c.y+10){
                        inputColor.setAttribute('style', `left:${e.clientX+5}px; top:${e.clientY+10}px;`);
                        inputColor.title = "1";
                        button.setAttribute("style", `display:inline; left:${e.clientX+3}px; top:${e.clientY+5}px`);
                        button.setAttribute("onclick",`d.getPoints().splice(${i},1); d.refreshAll();`);
                        buttonColor.setAttribute("style", `display:inline; left:${e.clientX+3}px; top:${e.clientY}px`);
                        buttonColor.setAttribute("onclick", `d.getPoints()[${i}].color=inputColor.value; d.refreshAll();`)
                    }
                }
            }
        
            if (!drag && !change) {
                let center = new InterpolatedPoint(e.clientX, e.clientY);
                let p = new ApproximatedPoint(e.clientX+2, e.clientY+2);
                let ap = new AnglePoint(p,center, AnglePoint.oppositePoint(p, center));
                that.list[that.index].push(ap);
            } else if(!change) { 
                let a = new AnglePoint(spiral.p2, spiral.p3, AnglePoint.oppositePoint(spiral.p2, spiral.p3));
                that.list[that.index].push(a)
            }
            that.refreshAll();
            click = false;
            drag = false;
            oPointMove = false;
            centerMove = false;
            change=false;
        });

        canvas.addEventListener("mousemove", function(e) {
            if (click && change){
                drag = true;
            }

            if (click && change){
                that.drag = true;
                if (oPointMove) {
                    that.list[that.index][ind].op.x = e.clientX;
                    that.list[that.index][ind].op.y = e.clientY;
                    that.list[that.index][ind].p = AnglePoint.oppositePoint(that.list[that.index][ind].op, that.list[that.index][ind].c);
                }
                else if (centerMove){
                    that.list[that.index][ind].p.x += e.clientX - that.list[that.index][ind].c.x;
                    that.list[that.index][ind].p.y += e.clientY - that.list[that.index][ind].c.y;
                    that.list[that.index][ind].op = AnglePoint.oppositePoint(that.list[that.index][ind].p, that.list[that.index][ind].c);
                    that.list[that.index][ind].c.x = e.clientX;
                    that.list[that.index][ind].c.y = e.clientY;
                }
                else{
                    that.list[that.index][ind].p.x = e.clientX;
                    that.list[that.index][ind].p.y = e.clientY;
                    that.list[that.index][ind].op = AnglePoint.oppositePoint(that.list[that.index][ind].p, that.list[that.index][ind].c);
                }
                that.refreshAll();
            }
            if (click && !change) {
                drag = true;
                that.refreshAll();
                point = new ApproximatedPoint(e.clientX, e.clientY);
                point.draw("blue");
                p2 = that.list[that.index][that.list[that.index].length-1].c;
                p2.draw("blue");
                let ap = that.list[that.index][that.list[that.index].length-1];               
                startPoint.draw("blue");
                AnglePoint.oppositePoint(ap.p, ap.c).draw("blue");
                spiral = new Curve( p2, 
                                    that.list[that.index].length>0 ? AnglePoint.oppositePoint(ap.p, ap.c):p2, 
                                    point, 
                                    startPoint);
                Drawing.drawT(spiral.p0, spiral.p1);
                spiral.draw();
            }
        });
    }
}

let d = new Drawing();