class Vector4f{
    constructor(x, y, z, w=1){
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    static negate(v){
        return new Vector4f(-1*v.x, -1*v.y, -1*v.z);
    }

    static add(v1, v2){
        return new Vector4f(v1.x+v2.x, v1.y+v2.y, v1.z+v2.z);
    }

    static scalarProduct(n, v){
        return new Vector4f(n*v.x, n*v.y, n*v.z);
    }

    static dotProduct(v1, v2){
        return (v1.x*v2.x)+(v1.y*v2.y)+(v1.z*v2.z);
    }

    static crossProduct(v1, v2){
        const x = (v1.y*v2.z)-(v1.z*v2.y);
        const y = (v1.z*v2.x)-(v1.x*v2.z);
        const z = (v1.x*v2.y)-(v1.y*v2.x);
        return new Vector4f(x, y, z);
    }

    static length(v){
        return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2)+ Math.pow(v.z, 2));
    }

    static normalize(v){
        if (this.length(v)==0){
            alert("The vector has a length of 0 (null vector)!");
        }
        return new Vector4f(v.x/this.length(v), v.y/this.length(v), v.z/this.length(v));
    }

    static project(v1, v2){
        return this.scalarProduct(this.dotProduct(v1, v2)/Math.pow(this.length(v2), 2), v2);
    }

    static cosPhi(v1, v2){
        if (this.length(v1)==0 || this.length(v2)==0){
            alert("There is a vector with length 0 (null vector)!");
        }
        return this.dotProduct(v1, v2)/(this.length(v1)*this.length(v2));
    }
}