//set up variables
let deg = document.getElementById("deg").value;
let jump = document.getElementById("jump").value%(deg/2);
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
    ctx.save()
    ctx.moveTo(0, r);
    ctx.rotate(2*pi*jump/deg);
    ctx.lineTo(0, r);
    ctx.restore();
    ctx.rotate(2*pi/deg);
  }
  ctx.stroke();
  ctx.restore();
  ctx.save();


  //update info
  let radius = 1;
  let t = 2*pi/deg;
  let a = (deg-2*jump)*pi/deg;
  let l = radius*Math.sin(t/2)/Math.sin(pi-(a+t)/2);
  let area = (l*Math.sin(a/2)*radius)*deg;
  let info = `
  Points: ${deg}<br>
  Jump: ${jump}<br>
  Point Angle: ${roundOff(a, 4)} radians<br>
  <br><i>If radius is 1: </i><br>
  Edge Length = ${roundOff(l, 4)}<span class="dull">*</span><br>
  Perimeter = ${roundOff(deg*l*2, 4)}<span class="dull">*</span><br>
  Area = ${roundOff(area, 4)}<br>
  <br><div class="dull">* outside edge length and perimeter; ignores inside lines</div>
  <br>
  `;

  document.getElementById("info").innerHTML = info;

}

function drawConnected() {
  ctx.clearRect(0, 0, size, size);

  //display points and jump
  ctx.strokeStyle = "gray";
  ctx.fillStyle = "gray";
  ctx.fillText(deg + " / All", 4, 16);

  //draw the base circle
  ctx.translate(size/2, size/2);
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, 2*pi);
  ctx.stroke();

  if (deg <= 30) {
    ctx.fillStyle = "black";
    for (let n = 0; n < deg; n++) {
      ctx.beginPath();
      ctx.arc(0, r, dotr, 0, 2*pi);
      ctx.fill();
      ctx.rotate(2*pi/deg);
    }
  }

  ctx.strokeStyle = "black";
  ctx.beginPath();
  for (let a=1; a<deg; a++){
    for (let b=1; b<=(deg-a); b++) {
      ctx.save();
      ctx.moveTo(0, r);
      ctx.rotate(2*pi*b/deg);
      ctx.lineTo(0, r);
      ctx.restore();
    }
    ctx.rotate(2*pi/deg);
  }
  ctx.stroke();
  ctx.restore();
  ctx.save();

  //update info
  let info = `Points: ${deg}<br>`;
  document.getElementById("info").innerHTML = info;
}

function update() {
  deg = Math.abs(parseInt(document.getElementById("deg").value));
  jump = Math.abs(parseInt(document.getElementById("jump").value));
  connected = document.getElementById("connectAll").checked;
  if (!Number.isInteger(deg) || !Number.isInteger(jump)) {
    alert(deg + ", " + jump);
    let errorDiv = document.createElement("div");
    errorDiv.className="error";
    let errorText = document.createTextNode("Inputs must be integers.");
    errorDiv.appendChild(errorText);
    document.getElementById("content").insertBefore(errorDiv, document.getElementById("input"));
    deg = 0;
    jump = 0;
  }
  if (jump > deg/2) {
    jump = deg-(jump%deg);
  }
  if (!connected) {
    draw();
  } else {
    drawConnected();
  }
}
