import Node from './Node.js';

export default class Light extends Node {

    constructor() {
        super();

        Object.assign(this, {
            position         : [300, 400, 500],
            ambientColor     : [255, 230, 230],
            diffuseColor     : [204, 204, 204],
            specularColor    : [255, 255, 255],
            shininess        : 10,
            attenuatuion     : [1, 0.0000001, 0.0000000000001]
        });
    }

}
