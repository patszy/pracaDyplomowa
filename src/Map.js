import * as THREE from 'three';

class Map extends THREE.Mesh {
  constructor({
    startRadius,
    endRadius,
    details,
    color = `#ffffff`,
    velocity = 0,
    gravity = 0,
    position = {x: 0, y: 0, z: 0},
  }) {
    super (
      new THREE.RingGeometry(startRadius, endRadius, details),
      new THREE.MeshLambertMaterial({color, side: THREE.DoubleSide})
    )

    this.startRadius = startRadius;
    this.endRadius = endRadius;
    this.middle = (startRadius+endRadius)/2;
    this.velocity = velocity;
    this.gravity = gravity;

    this.position.set(position.x, position.y, position.z);

    this.top = this.position.y;
    this.bottom = this.position.y;
  }
  
  setHorizontally() {
    this.rotateX(Math.PI / 2);
  }
}

export default Map;