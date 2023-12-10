import * as THREE from 'three';
import MapElement from '../abstractClasses/MapElement';
import { degreeToRadians, drawRandom } from '../functions';

class Cloud extends MapElement {
  constructor({
    scale = new THREE.Vector3(drawRandom(1, 2), drawRandom(.5, .7), drawRandom(1, 2)),
    ...options
  }) {
    super(options);

    this.scale = scale;

    this.geometry = new THREE.DodecahedronGeometry(options.radius, options.details);
    this.material = new THREE.MeshLambertMaterial({ color: options.color, opacity: 0.7, transparent: true });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(...this.position);
    this.spawn();
  }

  updatePosition(map) {
    super.updatePosition(map);
  }

  spawn() {
    this.radius = drawRandom(10, 20);
    this.position.z = drawRandom(-300, 300);
    if(this.position.z < -150 || this.position.z > 150) this.aboveMapHeight = drawRandom(0,70);
    else this.aboveMapHeight = drawRandom(70, 150);
    this.scale = new THREE.Vector3(drawRandom(1, 2), drawRandom(.5, .7), drawRandom(1, 2)),
    this.mesh.geometry = new THREE.DodecahedronGeometry(this.radius, this.details);
    this.mesh.scale.set(...this.scale);
  }
}

export default Cloud;
