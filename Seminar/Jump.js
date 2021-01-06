const quat = glMatrix.quat;

export default class Jump {
    constructor(ramp) {
        this.ramp = ramp;
        this.floorY = 6;
        console.log(ramp);
    }



    gravity() {
        
    }

    jump(car) {
        if (car.translation[0] < this.ramp.translation[0]+20 && 
            car.translation[0] > this.ramp.translation[0]-20 && 
            car.translation[2] < this.ramp.translation[2]+40 && 
            car.translation[2] > this.ramp.translation[2]-30) {
                if (car.translation[1] < 35){
                    car.translation[1]++;
                }
                    if (car.yaw<30){
                car.yaw++;
                }
        } else {
            if (car.translation[1]>this.floorY) {
                car.translation[1]-=0.5;
                if (car.translation[1]==this.floorY) {
                    car.yaw=0;
                }
            }
            if (car.yaw>0){
                car.yaw-=20;
            }
        }
    }
}