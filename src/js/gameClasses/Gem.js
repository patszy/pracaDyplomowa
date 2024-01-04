import * as THREE from 'three';
import MapElement from '../abstractClasses/MapElement';
import { checkSphereCollision, degreeToRadians, drawRandom } from '../functions';

class Gem extends MapElement {
  constructor({
    shininess = 1,
    rotationSpeed = 0,
    ...options
  }) {
    super(options);

    this.rotationSpeed = rotationSpeed;
    this.angle = 0;

    this.geometry = new THREE.OctahedronGeometry(options.radius, options.details);
    this.material = new THREE.MeshPhongMaterial({color: options.color, shininess, flatShading: true});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  updatePosition(map, hero, game) {
    super.updatePosition(map);

    if(Math.floor(this.angle%degreeToRadians(360)) >= Math.floor(degreeToRadians(360))) this.spawn(map);

    if(checkSphereCollision(this, hero)) {
      this.spawn(map);
      
      game.updateScore(map);
      hero.setRotationSpeed(map);
    }
  }

  spawn(map) { 
    const currentBox = map.mesh.children[(map.boxNumber+1 > map.numberOfSquares-1) ? 0 : map.boxNumber + 1];
    const {angle} = currentBox;
    const {height} = currentBox.geometry.parameters;
  
    this.aboveMapHeight = height+map.size;
    this.angle = (angle>=degreeToRadians(360)) ? angle%degreeToRadians(360) : angle;
  }
}

export default Gem;