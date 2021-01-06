class TransformPoints{
    static transform(m){
        let t = new Transformation();
        t.translate(new Vector4f(1.25,0,0));
        t.rotateZ(Math.PI/3);
        t.translate(new Vector4f(0,0,4.15));
        t.translate(new Vector4f(0,3.14,0));
        t.scale(new Vector4f(1.12,1.12,1));
        t.rotateY((5*Math.PI)/8);
        let a = new Array();
        for (var i=0;i<m.matrix.length;i++){
            a.push(new Vector4f(t.transformPoint(m.matrix[i]).matrix[0][0],t.transformPoint(m.matrix[i]).matrix[1][0],t.transformPoint(m.matrix[i]).matrix[2][0]));
        }
        
        PointManager.write(new Matrix4f(a));
    }
}
