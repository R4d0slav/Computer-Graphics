const vec3 = glMatrix.vec3;
const quat = glMatrix.quat;
const ch = document.getElementById('checkpoint');
const context = ch.getContext('2d');
context.font = "150% Arial";

var x = document.getElementById("checkpointSound");

function playAudio() {
    x.currentTime=0.6;
    x.play();
}

function pauseAudio() {
  x.pause();
  
}
export default class Checkpoint {
    constructor(checkpoint, timer, laps) {
        if (!laps) {
            laps = 1;
        }
        
        ch.style.display='block';
        this.timer = timer;
        this.index = 0;
        this.maxIndex = 7;
        this.checkpointCoords = [];
        this.checkpointRotations = [];
        this.initCheckpoints();
        this.checkpoint = checkpoint;
        this.score = 0;
        this.lapNum = laps;
        this.lap = 9*this.lapNum-this.lapNum+1;
        this.draw();


        this.checkpoint.translation = this.getCheckpointCoords();
        this.checkpoint.rotation = this.getCheckpointRotations();
        this.checkpoint.updateMatrix();
        this.finished = false;
    }

    setLapNum(n) {
        this.lapNum = n;
    }


    draw(n = this.score) {
        context.clearRect(0, 0, 400, 300);
        context.fillText("Checkpoints: "+n+"/"+this.lap, 30, 40);
    }

    finish(keys) {
        if (this.score >= this.lap) {
            ch.style.left="40%";
            ch.style.top="20%";
            context.clearRect(0, 0, 400, 300);
            if (this.timer.getTime()<=0) {
                context.fillText("Finished, time: 0 s", 40, 40);
            } else {
                context.fillText("Finished, time: "+this.timer.getTime()+" s", 40, 40);
            }
            context.fillText(" Press R to reset", 40, 65);
            this.timer.pauseTimer();
            this.timer.hideTimer();
            this.finished = true;
            keys['KeyW'] = false;
            keys['KeyS'] = false;
            keys['KeyA'] = false;
            keys['KeyD'] = false;
        }
    }

    finished() {
        return this.finished;
    }

    reset() {           
        context.clearRect(0, 0, 400, 300);
        ch.style.left="0%";
        ch.style.top="3%";
        this.score = 0;
        this.index = 0;
        this.finished = false;
        this.draw(0);
        this.checkpoint.translation = this.getCheckpointCoords();
        this.checkpoint.rotation = this.getCheckpointRotations();
        this.checkpoint.updateMatrix();
    }


    update(car, keys) {
        this.finish(keys);
        if (car.translation[0] < this.checkpoint.translation[0]+30 && 
            car.translation[0] > this.checkpoint.translation[0]-30 && 
            car.translation[2] < this.checkpoint.translation[2]+30 && 
            car.translation[2] > this.checkpoint.translation[2]-30) {
                
            playAudio();
            this.index++;
            this.score++;
            if (this.index > this.maxIndex) {
                this.index = 0;
            }
            this.draw();
            this.checkpoint.translation = this.getCheckpointCoords(this.index);               
            this.checkpoint.rotation = this.getCheckpointRotations(this.index);
            this.checkpoint.updateMatrix();            
        }
    
    }

    incrementIndex() {
        this.index++;
    }

    createCoords(x, y, z) {
        let v = vec3.create();
        vec3.set(v, x, y, z);
        return v;
    }

    createRotations(x, y, z) {
        let q = quat.create();
        quat.fromEuler(q, x, y, z);
        return q;
    }

    getCheckpointCoords() {
        return this.checkpointCoords[this.index];
    }

    getCheckpointRotations() {
        return this.checkpointRotations[this.index];
    }

    initCheckpoints() {
        this.checkpointCoords.push(this.createCoords(-140, 10, -110));
        this.checkpointCoords.push(this.createCoords(-210, 10, -295));
        this.checkpointCoords.push(this.createCoords(-317, 10, -100));
        this.checkpointCoords.push(this.createCoords(-310, 10,  227));
        this.checkpointCoords.push(this.createCoords( 200, 10,  320));
        this.checkpointCoords.push(this.createCoords( -53, 10,  102));
        this.checkpointCoords.push(this.createCoords( 304, 10,  -220));
        this.checkpointCoords.push(this.createCoords( -15, 10,  -130));


        this.checkpointRotations.push(this.createRotations(90, 0, 0));
        this.checkpointRotations.push(this.createRotations(90, 90, 0));
        this.checkpointRotations.push(this.createRotations(90, 0, 0));
        this.checkpointRotations.push(this.createRotations(90, 45, 0));
        this.checkpointRotations.push(this.createRotations(90, 130, 0));
        this.checkpointRotations.push(this.createRotations(90, 0, 0));
        this.checkpointRotations.push(this.createRotations(90, 0, 0));
        this.checkpointRotations.push(this.createRotations(90, 0, 0));
    }
}