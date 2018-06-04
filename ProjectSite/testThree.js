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
const scene = new THREE.Scene();

//set up scene
scene.add(camera);
renderer.setSize(WIDTH, HEIGHT);
container.appendChild(renderer.domElement);

//sphere vars
const RADIUS = 50;
const SEGMENTS = 16;
const RINGS = 16;

//make a sphere material
const sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: 0xCC0000
    });

//make a sphere mesh
const sphere = new THREE.Mesh(

  new THREE.SphereGeometry(
    RADIUS,
    SEGMENTS,
    RINGS),

  sphereMaterial);

//move the sphere so it's visible
sphere.position.z = -300;

//add sphere to scene
scene.add(sphere);

//make a point light
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;
scene.add(pointLight);

//Render! Yay!
function update() {
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
requestAnimationFrame(update);
