const canvas = document.getElementById('boost');
var context = canvas.getContext("2d");

export default class Boost {
    constructor() {
        context.font = "32px Arial";
    }

    draw(boost) {
        context.clearRect(0, 0, canvas.width, canvas.height);
       

        context.fillStyle="#51a9ff";
        context.beginPath();
        context.rect(100, 135, 20, 5);
        if (boost>0) {
            context.fill();
        } else (boost = 0);
        context.stroke();
        context.closePath();

        context.beginPath();
        context.rect(120, 120, 20, 20);
        if (boost>100) {
            context.fill();
        }
        context.stroke();
        context.closePath();

        context.beginPath();
        context.rect(140, 105, 20, 35);
        if (boost>200) {
            context.fill();
        }
        context.stroke();
        context.closePath();

        context.beginPath();
        context.rect(160, 90, 20, 50);
        if (boost>300) {
            context.fill();
        }
        context.stroke();
        context.closePath();

        context.beginPath();
        context.rect(180, 75, 20, 65);
        if (boost>400) {
            context.fill();
        }
        context.stroke();
        context.closePath();

        context.beginPath();
        context.rect(200,  60, 20, 80);
        if (boost>500) {
            context.fill();
        }
        context.stroke();
        context.closePath();

        context.beginPath();
        context.rect(220, 45, 20, 95);
        if (boost>600) {
            context.fill();
        }
        context.stroke();
        context.closePath();


        context.beginPath();
        context.rect(240, 30, 20, 110);
        if (boost>700) {
            context.fill();
        }
        context.stroke();
        context.closePath();
        
        context.beginPath();
        context.rect(260, 15, 20, 125);
        if (boost>800) {
            context.fill();
        }
        context.stroke();
        context.closePath();

        context.beginPath();
        context.rect(280, 0, 20, 140);
        if (boost>900) {
            context.fill();
        }
        context.stroke();
        context.closePath();
        
        context.fillStyle="white";
        context.fillText("Nitro", 0, 140);
        context.fillText(Math.floor((boost/1000)*100)+"%", 180, 120);

    }
}