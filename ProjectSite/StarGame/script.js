/**
* Script for StarGame.
* Elana Elman 6/11/2019
*/

//set up variables
const pi = Math.PI;
const radius = 200;
const points = 5;
const margin = 10;
const dotRadius = 5;

let size = 2*radius+2*margin;

let canvas = document.getElementById("canvas");
canvas.width = size;
canvas.height = size;
let ctx = canvas.getContext("2d");

//draw a star from scratch.
function draw() {
  ctx.strokeStyle = "gray";
  ctx.translate(size/2, size/2);
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, 2*pi);  alert("hi");
  ctx.stroke();
}

draw();
