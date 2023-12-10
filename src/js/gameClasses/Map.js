
import GameElement from '../abstractClasses/GameElement';

class Map extends GameElement{
  constructor({
    gravity = 1,
    ...options
  }) {
    super(options);

    this.gravity = gravity;

    this.mesh.position.y = -this.radius;  
  }

  updatePosition() {
    this.mesh.rotation.z += this.speed;
  }
}

export default Map;