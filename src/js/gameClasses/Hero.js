import { MeshPhongMaterial, Mesh } from 'three';
import GameElement from '../abstractClasses/GameElement';
import { checkBoxCollision } from '../functions';

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
    this.material = new MeshPhongMaterial({color: options.color, shininess, flatShading: true});
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

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
    this.mesh.rotation.x += (map.rotationSpeed*100)/map.size;
  }

  updatePosition(map, game, gem) {  
    const {x,y,z} = this.checkCollision(map);
    
    this.setRotationSpeed(map);
    this.mesh.position.x += this.velocity.x;
    this.mesh.position.z += this.velocity.z;

    if(game.stats.health > 0 && map.getRotationMod()==0 ) game.updateScore();

    if(game.keys.jump) {
      if(!game.playStatus) game.startGame(map, this, gem);
      if(!this.jumping) {
        this.velocity.y = this.jumpStrength;
        this.jumping = true;
      };
    }

    if(x && z && y) {
      game.updateHealth();
      game.checkNoHealth(map, this);
    }

    this.applyGravity(map);
  }

  applyGravity(map) {
    this.updateSides();
    map.updateSides();

    this.velocity.y -= map.gravity;

    if(this.checkCollision(map).y) {
      this.jumping = false;
      this.velocity.y *= this.bounciness;
      this.velocity.y = -this.velocity.y;
    } else this.mesh.position.y += this.velocity.y;
  }

  checkCollision(map) {
    let x = false, y = false, z = false;
  
    for(let i=0; i<map.mesh.children.length; i++){
      const {x, y, z} = checkBoxCollision(this, map.mesh.children[i]);
  
      if(x && y && z) return {x, y, z};
    }
  
    return {x, y, z};
  }
}

export default Hero;