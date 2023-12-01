import * as THREE from 'three';
import { checkSphereCollision, degreeToRadians, drawRandom } from './functions';

class Gem {
  constructor({
    radius = 1,
    details = 0,
    color = `#0000ff`,
    shininess = 1,
    rotationSpeed = 0,
    rotationCenter = new THREE.Vector3(0, 0, 0),
    startAngle = 0,
    aboveMapHeight = 0,
    velocity = {x:0, y:0, z:0},
    position = {x: 0, y: 0, z:0}
  }) {
    this.geometry = new THREE.OctahedronGeometry(radius, details);
    this.material = new THREE.MeshPhongMaterial({color, shininess, flatShading: true});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.radius = radius;
    this.rotationSpeed = rotationSpeed,
    this.rotationCenter = rotationCenter,
    this.aboveMapHeight = aboveMapHeight,
    this.startAngle = startAngle,
    this.velocity = velocity;
    
    this.mesh.position.set(position.x, position.y, position.z);

    this.right = this.mesh.position.x + this.radius;
    this.left = this.mesh.position.x - this.radius;
    this.top = this.mesh.position.y + this.radius;
    this.bottom = this.mesh.position.y - this.radius;
    this.front = this.mesh.position.z + this.radius;
    this.back = this.mesh.position.z - this.radius;
  }

  getSides() {
    this.right = this.mesh.position.x + this.radius;
    this.left = this.mesh.position.x - this.radius;
    this.top = this.mesh.position.y + this.radius;
    this.bottom = this.mesh.position.y - this.radius;
    this.front = this.mesh.position.z + this.radius;
    this.back = this.mesh.position.z - this.radius;
  }

  updatePosition(map, hero, game) {
    this.getSides();

    this.mesh.rotation.y -= this.rotationSpeed;
    this.velocity.x = this.velocity.y += map.speed;

    this.mesh.position.x = Math.cos(degreeToRadians(this.startAngle) + this.velocity.x) * (map.radius + this.aboveMapHeight) + this.rotationCenter.x;
    this.mesh.position.y = Math.sin(degreeToRadians(this.startAngle) + this.velocity.y) * (map.radius + this.aboveMapHeight) + this.rotationCenter.y;
    
    if(checkSphereCollision({ obj1: this, obj2: hero })) {
      this.spawn();
      this.updatePosition(map, hero);
      game.updateScore(map);
      hero.setRotationSpeed(map);
    }
  }

  spawn() {
    this.startAngle = drawRandom(180, 360);
    this.velocity.x = this.velocity.y = 0;
  }
}

export default Gem;