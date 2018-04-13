function getStarCanvas(deg, jump) {
  //set up variables
  let dotr = 3;
  const pi = Math.PI;
  const size = 200;
  const r = size*4/9;
  let canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  canvas.style.border = "1px solid black";
  let ctx = canvas.getContext("2d");
  ctx.font = "14px sans-serif";
  ctx.save();

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
  ctx.restore();
  ctx.save();

  return canvas;
}

function addStar(deg, jump) {
  document.getElementById("stars").appendChild(getStarCanvas(deg, jump), document.getElementById("stars"));
}

function addStars() {

  let startPoints = parseInt(document.getElementById("startPoints").value);
  let endPoints = parseInt(document.getElementById("endPoints").value);
  let startJump = parseInt(document.getElementById("startJump").value);
  let endJump = parseInt(document.getElementById("endJump").value);
  let condition = document.getElementById("jump").value;

  for (let p = startPoints; p <= endPoints; p++) {
    for (let j = startJump; j <= endJump; j++) {
      if(eval(condition)) {
        document.getElementById("stars").appendChild(getStarCanvas(p, j));
      }
    }
  }
}

function clearAll() {
  document.getElementById("stars").innerHTML = "";
}
