class Game {
  constructor({
    status = `play`,
    initialMapSpeed = 0,
    levelUpSpeed = 0,
    health = 0,
  }){
    this.status = status;
    this.initialMapSpeed = initialMapSpeed;
    this.levelUpSpeed = levelUpSpeed;
    this.health = health;
  }

  stopGame(hero) {
    hero.mesh.position.x -= 2;
    hero.mesh.position.z += 5;
  }
}

export default Game;