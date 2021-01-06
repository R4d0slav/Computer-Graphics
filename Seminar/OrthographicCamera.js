import Camera from './Camera.js';

const mat4 = glMatrix.mat4;

export default class OrthographicCamera extends Camera {

    constructor(options = {}) {
        super(options);

        this.left = options.left || -100;
        this.right = options.right || 100;
        this.bottom = options.bottom || -100;
        this.top = options.top || 100;
        this.near = options.near || -100;
        this.far = options.far || 100;

        this.updateMatrix();
    }

    updateMatrix() {
        mat4.ortho(this.matrix,
            this.left, this.right,
            this.bottom, this.top,
            this.near, this.far);
    }

}