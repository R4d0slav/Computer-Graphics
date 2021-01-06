const timer = document.getElementById('timer');
const context = timer.getContext('2d');
context.font = "180% Arial";

export default class Timer {
    constructor() {
        timer.style.display='block';
        this.time = Date.now();
        this.seconds = -4;
        this.paused = false;
        this.startTimer();
    }

    getTime() {
        return this.seconds;
    }

    update() {
        if (!this.paused && Date.now()-this.time >= 1000) {
            this.time = Date.now();
            this.seconds++;
            this.draw();
        }
    }

    startTimer() {
        this.paused = false;
        this.update();
    }

    pauseTimer() {
        this.paused = true;
    }

    resetTimer() {
        this.seconds = -4;
        this.startTimer();
    }

    hideTimer() {
        context.clearRect(0, 0, 300, 300);
    }

    draw(seconds = this.seconds) {
        context.clearRect(0, 0, 300, 300);
        if (seconds>0) {
            context.fillText(seconds+" s", 30, 40);
        } else if (seconds<0) {
            context.fillText(Math.abs(seconds), 30, 40);
        }
        else {
            context.fillText("Go!", 30, 40);

        }
    }
    
    static clear() {
        timer.style.display="none;";
    }
}