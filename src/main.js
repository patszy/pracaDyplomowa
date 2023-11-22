import * as THREE from 'three';

const colors = {
  blue:`#219ebc`,
  orange:`#fb8500`,
  green:`#38b000`,
}

let scene,
camera,
renderer,
width = window.innerWidth,
height = window.innerHeight;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});

renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);

const heroGeometry = new THREE.OctahedronGeometry(.5, 3);
const heroMaterial = new THREE.MeshPhongMaterial({color: colors.blue, shininess: 100});
const heroMesh = new THREE.Mesh( heroGeometry, heroMaterial );
scene.add(heroMesh);
heroMesh.position.y = .5;


const mapGeometry = new THREE.RingGeometry(5, 10, 64);
const mapMaterial = new THREE.MeshLambertMaterial({color: colors.green, side: THREE.DoubleSide});
const mapMesh = new THREE.Mesh(mapGeometry, mapMaterial);
scene.add(mapMesh);
mapMesh.rotateX(Math.PI / 2);

const ambientLight = new THREE.AmbientLight(0xffffff, .5);
scene.add(ambientLight)

const light = new THREE.PointLight( 0xffffff, 100);
light.position.x = Math.sin(Math.PI / 8) * 7.5;
light.position.y = 5;
light.position.z = Math.cos(Math.PI / 8) * 7.5;
scene.add(light)

camera.position.set(0, 3, 15);

var rotation = Math.PI / 4;
var radius = 7.5;
var move = 0.03;
var jump = false;

function animate() {
	requestAnimationFrame(animate);
  
  radius += move;
  if(radius >= 10) move = -move;
  else if(radius <= 5) move = -move;

  heroMesh.position.x = Math.sin(rotation) * radius;
  // heroMesh.position.y = 2;
  heroMesh.position.z = Math.cos(rotation) * radius;

  // heroMesh.rotation.x += 0.01;
	// heroMesh.rotation.y += 0.01;

	renderer.render( scene, camera );
}
animate();