// var gsap = require("gsap");
// import gsap from "gsap";

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#555555");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

//code

//var geometry = new THREE.SphereGeometry(2, 100, 100);
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0xffcc00 });
var mesh = new THREE.Mesh(geometry, material);
// mesh.rotation.y = 2;
// mesh.position.x = -2;
mesh.position.set(-1, 0, 0);
// mesh.rotation.set(45, 0, 0);
// mesh.scale.set(1, 2, 1);

scene.add(mesh);

var light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

//end code

var render = function () {
  requestAnimationFrame(render);
  //   mesh.rotation.x += 0.05;
  //   mesh.rotation.y += 0.05;
  //   mesh.scale.x += 0.001;
  //   mesh.scale.y += 0.001;
  //   mesh.scale.z += 0.001;

  renderer.render(scene, camera);
};

render();

this.tl = new TimelineMax({ paused: true }).delay(0.3);
this.tl.to(this.mesh.scale, 1, { x: 2, ease: Expo.easeOut });
this.tl.to(this.mesh.scale, 0.5, { x: 0.5, ease: Expo.easeOut });
this.tl.to(this.mesh.scale, 0.5, { x: 2, ease: Expo.easeOut });
this.tl.to(
  this.mesh.rotation,
  0.5,
  { y: Math.PI * 0.5, ease: Expo.easeOut },
  "-=1.5"
);

document.body.addEventListener("click", () => {
  this.tl.play();
});
