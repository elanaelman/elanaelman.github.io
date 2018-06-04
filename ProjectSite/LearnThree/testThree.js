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
camera.rotation.z = -.5;
camera.rotation.y  = 0.1;
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
tetrahedron.position.z = -400;
tetrahedron.rotation.x = 0.4;
tetrahedron.rotation.y = -0.7;
scene.add(tetrahedron);

//make a point light
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 300;
pointLight.position.y = 200;
pointLight.position.z = 100;
scene.add(pointLight);

//Render! Yay!
function update() {
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
requestAnimationFrame(update);
