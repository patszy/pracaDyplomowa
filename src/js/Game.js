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

  stopGame(map, hero) {
    this.status = `stop`;
    hero.rotationSpeed = 0;
    hero.jumpStrength = 0;
    map.speed = 0;
  }
}

export default Game;