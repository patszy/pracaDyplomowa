class Game {
  constructor({
    status = `restart`,
    initialMapSpeed = 0,
    levelUpMapSpeed = 0,
    levelUpSpeed = 2,
    health = 0,
    level = 1
  }){
    this.status = status;
    this.initialMapSpeed = initialMapSpeed;
    this.levelUpMapSpeed = levelUpMapSpeed;
    this.levelUpSpeed = levelUpSpeed;
    this.health = health;
    this.level = level;
    this.score = 0;
    this.levelValue = document.getElementById(`levelValue`);
    this.scoreValue = document.getElementById(`scoreValue`);
    this.scoreBar = document.getElementById(`hpBar`);
    this.hpValue = document.getElementById(`hpValue`);
    this.messageRestart = document.getElementById(`restartMessage`);
  }

  stopGame(hero) {
    hero.mesh.position.x -= 2;
    hero.mesh.position.z += 5;
    this.messageRestart.style.display = `block`;
    this.scoreValue.style.fontSize = `5em`;
    this.status = `gameOver`;
  }

  updateScore(map) {
    this.score++;
    this.scoreValue.innerText = this.score;
    if(this.score % this.levelUpSpeed == 0) {
      this.level ++;
      map.speed += this.levelUpMapSpeed;
      this.levelValue.innerText = `${this.level}`;
    }
  }

  updateHealth(rock) {
    this.health -= Math.round(rock.radius);
    this.hpValue.innerText = this.scoreBar.style.width = `${this.health}%`;
    if(this.health < 0 ) this.hpValue.innerText = this.scoreBar.style.width = `0%`;
  }
}

export default Game;