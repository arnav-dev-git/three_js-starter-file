var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
const loader = new THREE.TextureLoader();
loader.load(
  "https://images.unsplash.com/photo-1496737018672-b1a6be2e949c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80",
  function (texture) {
    scene.background = texture;
  }
);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#232323");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var geometry = new THREE.SphereGeometry(1, 100, 100);
var material = new THREE.MeshNormalMaterial({
  color: 0xffcc00,
  transparent: true,
  opacity: 0.7,
  distortion: true,
  distortionScale: 5.9,
});
var mesh = new THREE.Mesh(geometry, material);
// mesh.rotation.y = 2;
// mesh.position.x = -2;
// mesh.position.set(0, 0, 0);
// mesh.rotation.set(45, 0, 0);
// mesh.scale.set(1, 2, 1);

scene.add(mesh);

//obj 2

// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
// var mesh = new THREE.Mesh(geometry, material);
// mesh.position.y = 2;

// scene.add(mesh);
meshX = -10;

for (let i = 0; i < 25; i++) {
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (Math.random() - 0.5) * 10;
  mesh.position.y = (Math.random() - 0.3) * 10;
  mesh.position.z = (Math.random() - 0.2) * 10;
  scene.add(mesh);
  meshX += 1;
}

var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(0, 0, 0);
scene.add(light);

var light = new THREE.PointLight(0xffffff, 2, 1000);
light.position.set(0, 0, 25);
scene.add(light);

var render = function () {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
};

function onMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);
  for (var i = 0; i < intersects.length; i++) {
    this.tl = new TimelineMax().delay(0.3);
    this.tl.to(intersects[i].object.scale, 1, { x: 0.5, ease: Expo.easeOut });
    this.tl.to(intersects[i].object.scale, 0.5, { x: 1, ease: Expo.easeOut });
    this.tl.to(intersects[i].object.scale, 0.5, { z: 1.2, ease: Expo.easeOut });
    this.tl.to(
      intersects[i].object.rotation,
      0.5,
      { y: 1.7, ease: Expo.easeOut },
      "-=1.5"
    );
  }
}

window.addEventListener("mousemove", onMouseMove);
render();
