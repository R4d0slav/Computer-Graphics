import Application from './Application.js';
import * as WebGL from './WebGL.js';
import GLTFLoader from './GLTFLoader.js';
import Renderer from './Renderer.js';
import PerspectiveCamera from './PerspectiveCamera.js';
import Node from './Node.js';
import OrthographicCamera from './OrthographicCamera.js';
import Timer from './Timer.js';
import Checkpoint from './Checkpoints.js';
import Speedometer from './Speedometer.js';
import Light from "./Light.js";
import Trees from './Trees.js';
import Boost from './Boost.js';

const mat4 = glMatrix.mat4;
const mat3 = glMatrix.mat3;
const vec3 = glMatrix.vec3;
const quat = glMatrix.quat;
const quat4 = glMatrix.quat4;


const stack = document.getElementById('stack');

var x = document.getElementById("music");

function playAudio() {
    x.currentTime=39;
    x.play();
}

function pauseAudio() {
  y.pause();
}

var y = document.getElementById('car');

let laps = localStorage.getItem('laps');


const load = document.getElementById('loadScreen');

class App extends Application {

    async start() {

        this.loader = new GLTFLoader();
        await this.loader.load('./blender/map2backup.gltf');

        this.scene = await this.loader.loadScene(this.loader.defaultScene);

        this.tree = new Trees();

        await this.tree.build(this.loader, this.scene);

        await this.loader.load('./blender/ring.gltf');
        this.checkpoint = await this.loader.loadNode(this.loader.defaultScene);
        this.checkpoint.updateMatrix();

        await this.loader.load('./blender/car2backup.gltf');

        this.car = await this.loader.loadNode(this.loader.defaultScene);

        this.camera = new Node({
        translation: [-30, 30, 50],
        });
        this.camera.camera = new PerspectiveCamera();

        Object.assign(this.camera, {
            translation     :vec3.set(vec3.create(), -30, 30, 50),
            fov             : 1.5,
            maxFov          : 1.8,
            minFov          : 1,
            maxTranslation  : 7,
            yaw             : 9,
            pitch           : 0,
            roll            : 0,
            distanceFromCar : 50,
            zoom            : -20,
            offset          : 0,
            angle           : 0
        });

        Object.assign(this.car, {
            projection       : mat4.create(),
            rotation         : quat.fromEuler(quat.create(), 0, 0, 0),
            translation      : vec3.set(vec3.create(), -120, 4, -80),
            velocity         : vec3.set(vec3.create(), 0, 0, 0),
            mouseSensitivity : 0.002,
            heading          : 0,
            maxSpeed         : 3,
            friction         : 0.04,
            acceleration     : 0.2,
            yaw              : 0,
            pitch            : 0,
            roll             : 0,
            collided         : false
        });


        this.limit=0;

        this.timer = new Timer();

        this.cp = new Checkpoint(this.checkpoint, this.timer, laps);
        this.cp.reset();

        this.scene.addNode(this.car);
        this.scene.addNode(this.camera);
        this.scene.addNode(this.checkpoint);        
        
        this.light = new Light();
        this.scene.addNode(this.light);

        this.boost = 1000;
        this.boostClass = new Boost();

        this.boostClass.draw(this.boost);

        this.rot = 0;
        this.speed=0;
        this.maxSpeed = 210;

        this.speedometer = new Speedometer();

        this.initHandlers();
        this.time = performance.now();
        this.startTime = this.time;
        this.angle = this.car.pitch;
        this.lastKeyPressed=null;

        this.renderer = new Renderer(this.gl);
        this.renderer.prepareScene(this.scene);
        this.resize();


        load.style.display = 'none';
        //playAudio();
    }


  
  
    render() {
        if (this.renderer) {
            this.renderer.render(this.scene, this.camera, this.light);
        }
    }

    resize() {
        const w = this.canvas.clientWidth;
        const h = this.canvas.clientHeight;
        const aspectRatio = w / h;

        if (this.camera) {
            this.camera.camera.aspect = aspectRatio;
            this.camera.camera.updateMatrix();
        }
    }

    initHandlers() {
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.keys = {};

        document.addEventListener('keydown', this.keyDownHandler);
        document.addEventListener('keyup', this.keyUpHandler);
    }

    keyDownHandler(e) {
        if (!this.car.collided) {
            this.lastKeyPressed=e.code;
        }
        this.keys[e.code] = true;
    }

    keyUpHandler(e) {
        this.keys[e.code] = false;
        
    }

    turn() {
        if (!this.car.collided &&
            (Math.abs(this.car.velocity[0]) + Math.abs(this.car.velocity[1]) + Math.abs(this.car.velocity[2]) > 0.4)) 
        {
            return true;
        }
        return false;
    }
 

    moveCamera(dt) {
        var delta = dt;
        var sensitivity = 0.000048466;
 
       var rotateAngle = 360 * delta * sensitivity;

        if (this.keys['ArrowLeft'] && !this.cp.finished) {
            this.camera.offset -=360 * delta * 0.000139865044;
            this.rot-=360 * delta * 0.000139865044; 
            this.camera.angle--;
        }
        if (this.keys['ArrowRight'] && !this.cp.finished) {
            this.camera.offset += 360 * delta * 0.000139865044;
            this.rot+=360 * delta * 0.000139865044;
            this.camera.angle++;
        }
        if (this.keys['ArrowUp'] && !this.cp.finished && this.camera.zoom<-15) {
            this.camera.zoom++;
            this.camera.yaw-=0.3;
        }
        if (this.keys["ArrowDown"] && !this.cp.finished && this.camera.zoom>-100) {
            this.camera.zoom--;
            this.camera.yaw+=0.3;
         }


        if (this.turn() && this.keys["KeyA"]  && !this.cp.finished) {
            this.rot+=rotateAngle;
            this.angle+=0.6;
        }
        if (this.turn() && this.keys["KeyD"]  && !this.cp.finished) {
            this.rot-=rotateAngle;
            this.angle-=0.6;
        }
        if (this.angle>this.car.pitch+this.camera.offset) {
            this.rot-=rotateAngle;
            this.angle-=0.2;
        }
        if (this.angle<this.car.pitch+this.camera.offset) {
            this.rot+=rotateAngle;
            this.angle+=0.2;
        }

        if (this.angle+20>this.car.pitch+this.camera.offset) {
            this.rot-=rotateAngle;
            this.angle-=0.2;
        }
        if (this.angle-20<this.car.pitch+this.camera.offset) {
            this.rot+=rotateAngle;
            this.angle+=0.2;
        }

        if (!this.keys['KeyA'] && !this.keys['KeyD'] && this.angle-this.car.pitch+this.camera.offset>0.0 && this.angle-this.car.pitch+this.camera.offset < 2) {
            this.angle-=0.1;
            this.rot-=rotateAngle/2;
        }
        if (!this.keys['KeyA'] && !this.keys['KeyD'] && this.angle-this.car.pitch+this.camera.offset>-2 && this.angle-this.car.pitch+this.camera.offset < -0.0) {
            this.angle+=0.1;
            this.rot+=rotateAngle/2;
        }
      
        quat.fromEuler(this.camera.rotation, 0, (this.camera.angle+this.angle)*2, 0);
        var rotZ = Math.cos(this.rot);
        var rotX = Math.sin(this.rot);
        this.camera.translation[0] = this.car.translation[0] - (this.camera.zoom * rotX);
        this.camera.translation[1] = this.car.translation[1] + this.camera.yaw;
        this.camera.translation[2] = this.car.translation[2] - (this.camera.zoom * rotZ);
    }


    reset() {
        this.cp.reset();
        this.timer.resetTimer();
        Object.assign(this.car, {
            projection       : mat4.create(),
            rotation         : quat.fromEuler(quat.create(), 0, 0, 0),
            translation      : vec3.set(vec3.create(), -120, 4, -80),
            velocity         : vec3.set(vec3.create(), 0, 0, 0),
            mouseSensitivity : 0.002,
            heading          : 0,
            maxSpeed         : 3,
            friction         : 0.04,
            acceleration     : 0.2,
            yaw              : 0,
            pitch            : 0,
            roll             : 0,
            collided         : false
        });
      
        Object.assign(this.camera, {
            fov             : 1.5,
            maxFov          : 1.8,
            minFov          : 1,
            maxTranslation  : 7,
            yaw             : 9,
            pitch           : 0,
            roll            : 0,
            distanceFromCar : 50,
            zoom            : -20,
            offset          : 0,
            angle           : 0
        });
        this.rot = 0;
        this.speed = 0;
        this.angle=0;
        this.boost=1000;
        this.boostClass.draw(this.boost);
        playAudio();

        
    }
 
    update() {
        if (this.car) {
            this.time = performance.now();
            const dt = (this.time - this.startTime) *0.04;
            this.startTime = this.time;

            const c = this.car;
            this.speedometer.draw(this.speed);
            
            if (this.cp.finished) {
                this.keys['KeyW'] = false;
                this.keys['KeyS'] = false;
                this.keys['KeyA'] = false;
                this.keys['KeyD'] = false;
                
                var delta = dt/10;
                var sensitivity = 0.000141;

                this.camera.offset +=360 * delta * sensitivity;
                this.rot+=360 * delta * sensitivity; 
                this.camera.angle+=0.1;

                quat.fromEuler(this.camera.rotation, 0, (this.camera.angle+this.angle)*2, 0);
                var rotZ = Math.cos(this.rot);
                var rotX = Math.sin(this.rot);
                this.camera.translation[0] = this.car.translation[0] - (this.camera.zoom * rotX);
                this.camera.translation[1] = this.car.translation[1] + this.camera.yaw;
                this.camera.translation[2] = this.car.translation[2] - (this.camera.zoom * rotZ);
              
            }

            if (this.timer.getTime()<0) {
                this.keys['KeyW'] = false;
                this.keys['KeyS'] = false;
                this.keys['KeyA'] = false;
                this.keys['KeyD'] = false;
                this.speed=0;
            }

            this.timer.update();
            this.cp.update(this.car, this.keys);

            let angles = this.getEuler(c.rotation);
            
            const forward = vec3.set(vec3.create(), Math.sin(angles[1]), 0, -Math.cos(angles[1]));
           
            if (this.keys['KeyR']) {
                this.reset();
            }

            if (this.keys['KeyC'] && this.boost>0 && this.speed > 0) {
                this.car.maxSpeed=5;
                this.camera.maxFov=2.2;
                laps<=0? this.boost=0:this.boost-=3/laps;
                this.maxSpeed=300;
                this.boostClass.draw(this.boost);
            } else {
                this.car.maxSpeed=3;
                this.camera.maxFov=1.8;
                this.maxSpeed = 210;
                if (this.speed>this.maxSpeed) {
                    this.speed--;
                }
            }

            let acc = vec3.create();
            if (this.keys['KeyW']) {
                if (this.camera.camera.fov<this.camera.maxFov){
                    this.camera.camera.fov+=0.005;
                }
                this.car.maxSpeed=3;
                this.speed<this.maxSpeed? this.speed+=Math.abs(this.car.velocity[0])+Math.abs(this.car.velocity[1])+Math.abs(this.car.velocity[2]):null;
                vec3.add(acc, acc, forward);
            }
            if (this.keys['KeyS']) {
                vec3.sub(acc, acc, forward);
                this.maxSpeed = 80;
                this.speed<this.maxSpeed? this.speed+=Math.abs(this.car.velocity[0])+Math.abs(this.car.velocity[1])+Math.abs(this.car.velocity[2]):this.speed-=2;
                this.car.maxSpeed=2;
            }

            if(this.keys['KeyD']) {
                if (this.turn()) {
                    c.pitch-=1;
                }
            }
            if (this.keys['KeyA']) {
                if (this.turn()) {
                    c.pitch+=1;
                }
            }

            if (this.keys['Space']) {
                this.car.acceleration=0.05;
            } else {
                if (this.car.acceleration<0.2) {
                    this.car.acceleration+=0.01;
                }
            }
        
            vec3.scaleAndAdd(c.velocity, c.velocity, acc,2*dt*c.acceleration);
            
            if (!this.keys['KeyW'] && !this.keys['KeyS']) {
                vec3.scale(c.velocity, c.velocity, 1 - c.friction);
                if (this.camera.camera.fov != this.camera.fov) {
                    this.camera.camera.fov-=0.005;
                }
                if (this.speed > 0 ){
                    this.speed-=3;
                }
            }

            if (this.camera.camera.fov>this.camera.maxFov) {
                this.camera.camera.fov-=0.005;
            }
            const len = vec3.len(c.velocity);
            if (len > c.maxSpeed) {
                vec3.scale(c.velocity, c.velocity, c.maxSpeed / len);
            }

            this.tree.collision(c, dt, angles, this.lastKeyPressed);
            this.rotate(c, this.car.yaw, c.pitch*2, 0);
            this.moveCamera(dt);

            this.camera.camera.updateMatrix();
            this.camera.updateMatrix();
            c.updateMatrix();
        }
    }
   
    toRadians(n) {
        return n * Math.PI/180;
    }
  
    rotate(object, x=0, y=this.angle, z=0) {
        quat.fromEuler(object.rotation, x, y, z);
    }

   getEuler(q) {
       let vector = vec3.create();
       let x = q[0];
       let y = q[1];
       let z = q[2];
       let w = q[3];
       let x2 = x*x;
       let y2 = y*y;
       let z2 = z*z;
       let w2 = w*w;
       vector[0] = Math.asin(-2*(y*z+w*x));
       if (Math.cos(vector[0]!=0)) {
           vector[1] = Math.atan2(2*x*z-2*w*y, 1-2*x2-2*y2)
           vector[2] = Math.atan2(x*y-w*z, 1/2-x2-z2);
       } else {
           vector[1] = Math.atan2(-x*z-w*y, 1/2-y2-z2)
           vector[2] = 0;
       }
       return vector;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let resolution = localStorage.getItem('resolution');
    stack.style.width = resolution.toString(10)+"%";
    stack.style.height = resolution.toString(10)+"%";
    stack.style.left = ((100-resolution)/2).toString(10)+"%";
    stack.style.top = ((100-resolution)/2).toString(10)+"%";
    const app = new App(canvas);
});
