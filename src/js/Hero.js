import * as THREE from 'three';
import { checkSphereCollision } from './functions';

class Hero {
  constructor({
    radius = 1,
    details = 0,
    color = `#0000ff`,
    shininess = 0,
    rotationSpeed = 0,
    speed = 0,
    bounciness = 1,
    jumpStrength = 1,
    jumping = false,
    velocity = new THREE.Vector3(0, 1, 0),
    position = new THREE.Vector3(0, 0, 0),
  }) {
    this.geometry = new THREE.IcosahedronGeometry(radius, details);
    this.material = new THREE.MeshPhongMaterial({color, shininess, flatShading: true});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.radius = radius;
    this.velocity = velocity;
    this.rotationSpeed = rotationSpeed;
    this.speed = speed;
    this.bounciness = bounciness;
    this.jumpStrength = jumpStrength;
    this.jumping = jumping;

    this.mesh.position.set(position.x, position.y, position.z);

    this.right = this.mesh.position.x + this.radius;
    this.left = this.mesh.position.x - this.radius;
    this.top = this.mesh.position.y + this.radius;
    this.bottom = this.mesh.position.y - this.radius;
    this.front = this.mesh.position.z + this.radius;
    this.back = this.mesh.position.z - this.radius;
  }

  setRotationSpeed(map) {
    this.rotationSpeed = map.speed*((2*Math.PI*map.radius)/(2*Math.PI*this.radius));
  }

  getSides() {
    this.right = this.mesh.position.x + this.radius;
    this.left = this.mesh.position.x - this.radius;
    this.top = this.mesh.position.y + this.radius;
    this.bottom = this.mesh.position.y - this.radius;
    this.front = this.mesh.position.z + this.radius;
    this.back = this.mesh.position.z - this.radius;
  }

  updatePosition(map, game, Keys) {
    this.getSides();

    if(Keys.w.pressed) {
      if(game.playStatus) map.speed = map.rotationSpeed*2;
    } else map.speed = map.rotationSpeed;
    
    this.setRotationSpeed(map);

    if(Keys.space.pressed) {
      if(!game.playStatus) game.startGame(map, this);
      if(!this.jumping) {
        this.velocity.y = this.jumpStrength;
        this.jumping = true;
      };
    }

    if(map.reverse) this.mesh.rotation.z += this.rotationSpeed;
    else this.mesh.rotation.z -= this.rotationSpeed

    this.applyGravity(map)
  }

  applyGravity(map) {
    this.velocity.y -= map.gravity;

    // if(checkBoxCollision(this, map).y) {
    //   this.jumping = false;
    //   this.velocity.y *= this.bounciness;
    //   this.velocity.y = -this.velocity.y;
    // } else {
    //   this.mesh.position.y += this.velocity.y;
    // }
    
    if(checkSphereCollision(this, map)) {
      this.jumping = false;
      this.velocity.y *= this.bounciness;
      this.velocity.y = -this.velocity.y;
    } else {
      this.mesh.position.y += this.velocity.y;
    }
  }
}

export default Hero;