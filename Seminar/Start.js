const canvas2d = document.getElementById('canvas2d');

let update = function(e) {
    localStorage.setItem('laps', e.target.value);
}

if (canvas2d) {
    localStorage.setItem('resolution', 100);
    let ctx2d = canvas2d.getContext('2d');
    canvas2d.width = window.innerWidth;
    canvas2d.height = window.innerHeight;
    document.getElementById('laps').defaultValue=3;

    var img1 = new Image();
    img1.onload = function () {
        ctx2d.drawImage(img1, 0, 0, canvas2d.width, canvas2d.height);
    };
    img1.src = './blender/blue.jpg';

    let lap = document.getElementById('laps');
    localStorage.setItem('laps', lap.value);
    lap.addEventListener('input', update);
}   