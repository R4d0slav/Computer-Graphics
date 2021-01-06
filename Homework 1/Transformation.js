class Transformation{
    constructor(){
        this.matrix = new Matrix4f(
            [[1,0,0,0],
             [0,1,0,0],
             [0,0,1,0],
             [0,0,0,1]]);
    }

    translate(v){
        this.matrix = Matrix4f.multiply(new Matrix4f(
            [[1,0,0,v.x],
             [0,1,0,v.y],
             [0,0,1,v.z],
             [0,0,0,1]]),this.matrix);
    }

    scale(v){
        this.matrix = Matrix4f.multiply(new Matrix4f(
            [[v.x,0,0,0],
             [0,v.y,0,0],
             [0,0,v.z,0],
             [0,0,0,1]]),this.matrix);
    }
    
    rotateX(n){
        let r = new Matrix4f([[1,0,0,0],
                              [0,Math.cos(n),-Math.sin(n),0],
                              [0,Math.sin(n),Math.cos(n),0],
                              [0,0,0,1]]);
        this.matrix = Matrix4f.multiply(r, this.matrix);
    }

    rotateY(n){
        let r = new Matrix4f([[Math.cos(n),0,Math.sin(n),0],
                              [0,1,0,0],
                              [-Math.sin(n),0,Math.cos(n),0],
                              [0,0,0,1]]);
        this.matrix = Matrix4f.multiply(r, this.matrix);
    }

    rotateZ(n){
        let r = new Matrix4f([[Math.cos(n),-Math.sin(n),0,0],
                              [Math.sin(n),Math.cos(n),0,0],
                              [0,0,1,0],
                              [0,0,0,1]]);
        this.matrix = Matrix4f.multiply(r, this.matrix);
    }

    transformPoint(v){
        return Matrix4f.multiply(this.matrix,new Matrix4f([[v.x],[v.y],[v.z],[1]]));
    }

}