import * as THREE from 'three';
import GameElement from '../abstractClasses/GameElement';
import { checkSphereCollision } from '../functions';

class Hero extends GameElement{
  constructor({
    shininess = 0,
    bounciness = 1,
    jumpStrength = 1,
    jumping = false,
    ...options
  }) {
    const geometry = new THREE.IcosahedronGeometry(options.radius, options.details);
    const material = new THREE.MeshPhongMaterial({color: options.color, shininess, flatShading: true});

    super({
      geometry: geometry,
      material: material,
      ...options
    });

    this.bounciness = bounciness;
    this.jumpStrength = jumpStrength;
    this.jumping = jumping;

    this.mesh.castShadow = true;
  }

  setRotationSpeed(map) {
    this.rotationSpeed = map.speed*((2*Math.PI*map.radius)/(2*Math.PI*this.radius));
  }

  updatePosition(map, game, Keys) {
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