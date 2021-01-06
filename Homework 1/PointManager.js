class PointManager{

    static read(){
        var x = document.getElementById("input").value;
        var s1 = x.split("v");
        let a = new Array();
        for (var i=1;i<s1.length;i++){
            var s2 = s1[i].split(" ");
            if (s2[3]){
                a.push(new Vector4f(s2[1],s2[2],s2[3]));
            }else{
                a.push(new Vector4f(s2[1],s2[2],0));
            }
        }
        return new Matrix4f(a);
    }
    static write(m){
        if (m.matrix.length==0){
            alert("No valid input!");
        }else{
            output.innerHTML = `v ${m.matrix[0].x.toFixed(3)} ${m.matrix[0].y.toFixed(3)} ${m.matrix[0].z.toFixed(3)}\n`;
            if (m.matrix.length>1){
                for (var i=1;i<m.matrix.length-1;i++){
                    output.innerHTML += `v ${m.matrix[i].x.toFixed(3)} ${m.matrix[i].y.toFixed(3)} ${m.matrix[i].z.toFixed(3)}\n`;
                }
                output.innerHTML += `v ${m.matrix[i].x.toFixed(3)} ${m.matrix[i].y.toFixed(3)} ${m.matrix[i].z.toFixed(3)}`;
            }
        }
    }
}