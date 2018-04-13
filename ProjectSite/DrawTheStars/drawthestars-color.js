//set up variables
let deg = document.getElementById("deg").value;
let jump = document.getElementById("jump").value;
let dotr = 3;
const pi = Math.PI;
const size = 400;
const r = size*4/9;
let canvas = document.getElementById("canvas");
canvas.width = size;
canvas.height = size;
let ctx = canvas.getContext("2d");
ctx.font = "14px sans-serif";
ctx.save();
draw();

//function to draw a star
function draw() {

  ctx.clearRect(0, 0, size, size);

  //display points and jump
  ctx.strokeStyle = "gray";
  ctx.fillStyle = "gray";
  ctx.fillText(deg+" / "+jump, 4, 16);

    //draw the base circle
  ctx.translate(size/2, size/2);
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, 2*pi);
  ctx.stroke();

  //draw the points along the circle
  //but only if there aren't too many points
  if (deg <= 30) {
    ctx.fillStyle = "black";
    for (let n = 0; n < deg; n++) {
      ctx.beginPath();
      ctx.arc(0, r, dotr, 0, 2*pi);
      ctx.fill();
      ctx.rotate(2*pi/deg);
    }
  }

  //draw connecting lines
  ctx.strokeStyle = "black";
  ctx.beginPath();
  for (let n=0; n < deg; n++) {
    ctx.save();
    ctx.moveTo(0, r);
    ctx.rotate(2*pi*jump/deg);
    ctx.lineTo(0, r);
    ctx.restore();
    ctx.rotate(2*pi/deg);
  }
  ctx.stroke();
  //ctx.restore();  removed to allow testing

  //test
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(40, 40);
  ctx.lineTo(10, 40);
  ctx.lineTo(40, 10);
  ctx.lineTo(20, 0);
  ctx.lineTo(20, 50);
  ctx.lineTo(10, 10);
  ctx.fill();

  //also test
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.fillStyle = "blue";
  for (let n=0; n < deg/2; n++) {
    ctx.save();
    ctx.moveTo(0, r);
    ctx.rotate(2*pi*jump/deg);
    ctx.lineTo(0, r);
    ctx.restore();
    ctx.rotate(2*pi/deg);
  }
  ctx.fill(); //not gonna work, segments aren't connected
  ctx.restore();

}

function update() {
  deg = document.getElementById("deg").value;
    jump = document.getElementById("jump").value;
    draw();
}
