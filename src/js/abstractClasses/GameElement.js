import GameObject from './GameObject';

class GameElement extends GameObject {
  constructor({
    rotationSpeed = 0,
    ...options
  }) {
    if(new.target === GameElement) throw new Error("Cannot instantiate abstract class GameElement");

    super(options);
    
    this.rotationSpeed = rotationSpeed;

    this.mesh.receiveShadow = true;
  }
}

export default GameElement;