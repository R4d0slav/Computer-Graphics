class Matrix4f{
    constructor(matrix){
        this.matrix = matrix;
    }

    static negate(m){
        let a = new Array(m.matrix.length);
        for (var k=0;k<m.matrix.length;k++){
            a[k] = new Array(m.matrix[k].length);
        }
        for(var i=0;i<a.length;i++){
            for (var j=0;j<a[i].length;j++){
                a[i][j] = -1 *m.matrix[i][j];
            }
        }
        return new Matrix4f(a);
    }

    static add(m1, m2){
        if (m1.matrix.length==m2.matrix.length && m1.matrix[0].length==m2.matrix[0].length){
            let a = new Array(m1.matrix.length);
            for (var k=0;k<m1.matrix.length;k++){
                a[k] = new Array(m2.matrix[k].length);
            }

            for (var i=0;i<a.length;i++){
                for (var j=0;j<a[i].length;j++){
                a[i][j] = m1.matrix[i][j] + m2.matrix[i][j];
                }
            }
            return new Matrix4f(a);
        }else{
            alert("Undefined. The matrices have different sizes!");
        }
    }

    static transpose(m){
        let a = new Array(m.matrix[0].length);
        for (var k=0;k<a.length;k++){
            a[k] = new Array(m.matrix.length);
        }
        for (var j=0;j<a[0].length;j++){
            for (var i=0;i<a.length;i++){
                a[i][j] = m.matrix[j][i];
            }
        }
        return new Matrix4f(a);
    }

    static multiplyScalar(n, m){
        let a = new Array(m.matrix.length);
        for (var k=0;k<m.matrix.length;k++){
            a[k] = new Array(m.matrix[k].length);
        }
        for (var i=0;i<a.length;i++){
            for (var j=0;j<a[0].length;j++){
                a[i][j] = n*m.matrix[i][j];
            }
        }
        return new Matrix4f(a);
    }

    static multiply(m1, m2){
        if(m1.matrix[0].length==m2.matrix.length){
            let a = new Array(m1.matrix.length);
            for (var k=0;k<a.length;k++){
                a[k] = new Array(m2.matrix[0].length);
            }
            let a2 = Matrix4f.transpose(m2);
            for (var i=0;i<a.length;i++){
                for (var j=0;j<a[i].length;j++){
                    var sum = 0;
                    for (var h=0;h<m1.matrix[0].length;h++){
                        sum += m1.matrix[i][h]*a2.matrix[j][h];
                    }
                    a[i][j]=sum;
                }
            }
            return new Matrix4f(a);
        }
        else{
            alert("Undefined. The columns of the first matrix and rows of the second matrix have to be of same size!");
       }
    }
}