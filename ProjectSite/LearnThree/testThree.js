/**
* Trying out Three.js.
* Starting guide: https://aerotwist.com/tutorials/getting-started-with-three-js/
*
* 6/1/18
* Elana Elman
*/

//scene size
const WIDTH = 500;
const HEIGHT = 400;

//camera
const VIEW_ANGLE = 45;
const ASPECT = WIDTH/HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

//get container
const container = document.querySelector("#container");

//create WebGL renderer, camera, scene
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
//camera.rotation.z = -.5;
//camera.rotation.y  = 0.1;
camera.lookAt(0, 0, -500);
const scene = new THREE.Scene();

//set up scene
scene.add(camera);
renderer.setSize(WIDTH, HEIGHT);
container.appendChild(renderer.domElement);

//make a sphere
const RADIUS = 50;
const SEGMENTS = 16;
const RINGS = 16;
//make a sphere material
const sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: 0xAA00FF
    });
//make a sphere mesh
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS), sphereMaterial
);
//move the sphere so it's visible
sphere.position.z = -400;
sphere.position.x = -125;
//add sphere to scene
scene.add(sphere);

//make a box
let boxGeometry = new THREE.BoxGeometry(50, 45, 50);
let boxMaterial = new THREE.MeshLambertMaterial({
  color: 0xAA00FF
});
let box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.z = -400;
box.position.x = 125;
box.rotation.x = 0.5;
box.rotation.y = -0.3;
box.rotation.z = 0.55;
scene.add(box);

//make a tetrahedron! woot!
let tetrahedronGeom = new THREE.TetrahedronGeometry(50, 0);
let tetrahedronMaterial = new THREE.MeshNormalMaterial();
let  tetrahedron = new THREE.Mesh(tetrahedronGeom, tetrahedronMaterial);
tetrahedron.position.z = -500;
tetrahedron.rotation.x = 0.4;
tetrahedron.rotation.y = -0.7;
scene.add(tetrahedron);

//animate the tetrahedron?
function rotateShape(shape) {
  shape.rotation.x += Math.PI/32;
  shape.rotation.y += Math.PI/32;
  shape.rotation.z += Math.PI/32;
  shape.position.x = 150*Math.sin(Date.now()/1000 * 2);
  shape.position.y = 150*Math.cos(Date.now()/1000 * 4);
  shape.position.z = -500 + 300*Math.cos(Date.now()/1000 * 3);
}


//make a textured tetrahedron?
let bmap = THREE.ImageUtils.loadTexture('concrete-bump-map.jpg', {}, function(){});
let texturedTetraMat = new THREE.MeshPhongMaterial({
  color: 0xFFFFFF,
  bumpMap: bmap,
});
let texturedTetraGeom = new THREE.TetrahedronGeometry(50, 0);
let texturedTetra = new THREE.Mesh(texturedTetraGeom, texturedTetraMat);
texturedTetra.position.z = -500;
texturedTetra.rotation.x = 0.4;
texturedTetra.rotation.y = -0.7;
scene.add(texturedTetra);


//make a point light
const pointLight1 = new THREE.PointLight(0xFF0000);
pointLight1.position.x = 0;
pointLight1.position.y = 200;
pointLight1.position.z = -500;
scene.add(pointLight1);
//make an ambient light
const ambientLight = new THREE.AmbientLight(0x0000FF, 0.25);
scene.add(ambientLight);
//make a point light
const pointLight2 = new THREE.PointLight(0x0000FF, 0.3);
pointLight2.position.x = 300;
pointLight2.position.y = 200;
pointLight2.position.z = 500;
scene.add(pointLight2);

//Render! Yay!
function update() {
  rotateShape(tetrahedron);
  camera.position.set(500*Math.sin(Date.now()/1000), 250*Math.sin(Date.now()/1000), -500+500*Math.cos(Date.now()/1000));
  camera.lookAt(0, 0, -500);
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
requestAnimationFrame(update);
