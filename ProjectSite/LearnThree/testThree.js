/**
* Trying out Three.js.
* Starting guide: https://aerotwist.com/tutorials/getting-started-with-three-js/
* later: https://medium.com/@PavelLaptev/three-js-for-beginers-32ce451aabda
*
* 6/1/18
* Elana Elman
*/

var renderer, scene, camera, distance, raycaster, projector;

var tetrahedron, box, redlight;

//get container
const container = document.querySelector("#container");
//distance = 400;     what's this for?

//scene size
const WIDTH = 500;
const HEIGHT = 400;
const VIEW_ANGLE = 45;
const NEAR = 0.1;
const FAR = 10000;

function init() {
  //create WebGL renderer, camera, scene
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor(0x112244, 1);
  container.appendChild(renderer.domElement);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, WIDTH / HEIGHT, 0.2, 25000);
  //camera.rotation.z = -.5;
  //camera.rotation.y  = 0.1;
  camera.lookAt(0, 0, -500);
  scene.add(camera);


  //lighting! 2 lights rn:
  var pointLight1 = new THREE.PointLight(0x00FFFF);
  pointLight1.position.set(0, 200, -500);
  scene.add(pointLight1);
  var pointLight2 = new THREE.PointLight(0xFF00FF, 0.5);
  pointLight2.position.set(300, -100, -300);
  scene.add(pointLight2);

  //shapes!
  //make a sphere
  var sphereMaterial =
    new THREE.MeshLambertMaterial(
      {
        color: 0xAA00FF
      });
  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(50, 16, 16), sphereMaterial
  );
  sphere.position.z = -400;
  sphere.position.x = -125;
  scene.add(sphere);

  //make a box
  let boxGeometry = new THREE.BoxGeometry(50, 45, 50);
  let boxMaterial = new THREE.MeshLambertMaterial({
    color: 0xAA00FF
  });
  box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.z = -400;
  box.position.x = 125;
  box.rotation.x = 0.5;
  box.rotation.y = -0.3;
  //box.rotation.z = 0.55;
  scene.add(box);

  //make a tetrahedron! woot!
  let tetrahedronGeom = new THREE.TetrahedronGeometry(50, 0);
  let tetrahedronMaterial = new THREE.MeshNormalMaterial();
  tetrahedron = new THREE.Mesh(tetrahedronGeom, tetrahedronMaterial);
  tetrahedron.position.z = -500;
  tetrahedron.rotation.x = 0.4;
  tetrahedron.rotation.y = -0.7;
  scene.add(tetrahedron);

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

  requestAnimationFrame(update);

  container.addEventListener('mousemove', onMouseMove, false);
  container.addEventListener('mousedown', onMouseDown, false);
  container.addEventListener('mouseup', onMouseUp, false);
}

function onMouseMove(event) {
//  alert(event.clientX);
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
    box.rotation.y = (event.clientX - window.innerWidth/2)*0.01;
    box.rotation.x = (window.innerHeight/2 - event.clientY)*0.01;
    //set up camera position
    camera.lookAt(scene.position);
}

function onMouseDown(event) {
    redlight = new THREE.AmbientLight(0xFF8000, 0.3);
    scene.add(redlight);
}

function onMouseUp(event) {
  scene.remove(redlight);
}

//animate the tetrahedron?
function funkyShape(shape) {
  shape.rotation.x += Math.PI/20;
  shape.rotation.y += Math.PI/40;
  shape.rotation.z += Math.PI/30;
  shape.position.x = 100*Math.sin(Date.now()/1000 * 7);
  shape.position.y = 100*Math.cos(Date.now()/1000 * 5);
  shape.position.z = -500 + 100*Math.cos(Date.now()/1000 * 6);
}


//Render! Yay!
function update() {
  funkyShape(tetrahedron);
  camera.position.set(400*Math.sin(Date.now()/1000),
    50*Math.sin(Date.now()/1000), -500+600*Math.cos(Date.now()/1000));
  camera.lookAt(0, 0, -500);
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
