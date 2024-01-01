import * as THREE from 'three';
import GameElement from '../abstractClasses/GameElement';
import { checkMapCollision, checkBoxCollision, circleCircumference } from '../functions';

class Hero extends GameElement{
  constructor({
    shininess = 100,
    bounciness = 1,
    jumpStrength = 1,
    jumping = false,
    ...options
  }) {
    super(options);

    this.bounciness = bounciness;
    this.jumpStrength = jumpStrength;
    this.jumping = jumping;

//Sides
    this.right = this.mesh.position.x + this.radius;
    this.left = this.mesh.position.x - this.radius;
    this.bottom = this.mesh.position.y - this.radius;
    this.top = this.mesh.position.y + this.radius;
    this.front = this.mesh.position.z - this.radius;
    this.back = this.mesh.position.z + this.radius;

//THREE
    this.material = new THREE.MeshPhongMaterial({color: options.color, shininess, flatShading: true});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;

    this.updateSides();
  }

  updateSides() {
    this.right = this.mesh.position.x + this.radius;
    this.left = this.mesh.position.x - this.radius;

    this.bottom = this.mesh.position.y - this.radius;
    this.top = this.mesh.position.y + this.radius;

    this.front = this.mesh.position.z - this.radius;
    this.back = this.mesh.position.z + this.radius;
  }

  setPosition(position){
    this.mesh.position.set(...position);
  }

  setRotationSpeed(map){
    this.mesh.rotation.z += map.rotationSpeed*((2*Math.PI*map.size)/(2*Math.PI*this.radius));
  }

  updatePosition(map, game) {  
    const {x,y,z} = checkMapCollision(this, map);
    
    this.setRotationSpeed(map);

    this.mesh.position.x += this.velocity.x;
    this.mesh.position.z += this.velocity.z;

    if(game.keys.jump) {
      if(!game.playStatus) game.startGame(map, this);
      if(!this.jumping) {
        this.velocity.y = this.jumpStrength;
        this.jumping = true;
      };
    }

    if((x || z) && y) {
      game.stopGame(map, this);
      // this.velocity.y = this.jumpStrength/2;
      // game.updateHealth(this);
    }
    // game.checkNoHealth(this);

    this.applyGravity(map);
  }

  applyGravity(map) {
    this.updateSides();
    map.updateSides();

    this.velocity.y -= map.gravity;

    if(checkMapCollision(this, map).y) {
      this.jumping = false;
      this.velocity.y *= this.bounciness;
      this.velocity.y = -this.velocity.y;
    } else this.mesh.position.y += this.velocity.y;
  }
}

export default Hero;