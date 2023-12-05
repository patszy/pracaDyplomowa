class Game {
  constructor({
    playStatus = true,
    initialMapSpeed = 0,
    initialHeroPosition = {x: 0, y: 0, z:0},
    levelUpMapSpeed = 0,
    levelUpSpeed = 1,
    health = 0,
    level = 1
  }){
    this.playStatus = playStatus;
    this.initialMapSpeed = initialMapSpeed;
    this.initialHeroPosition = initialHeroPosition;
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

  startGame(map, hero) {
    hero.mesh.position.set(this.initialHeroPosition.x, this.initialHeroPosition.y, this.initialHeroPosition.z);
    map.velocity = this.initialMapSpeed;
    this.health = 100;
    this.score = 0;
    this.level = 1;
    this.messageRestart.style.display = `none`;
    this.scoreValue.innerText = this.score;
    this.levelValue.innerText = this.level;
    this.hpValue.innerText = this.scoreBar.style.width = `${this.health}%`;
    this.playStatus = true;
  }

  stopGame(hero) {
    hero.mesh.position.x -= 2;
    hero.mesh.position.z += 5;
    this.messageRestart.style.display = `block`;
    this.playStatus = false;
  }

  updateScore(map) {
    this.score++;
    this.scoreValue.innerText = this.score;
    if(this.score % this.levelUpSpeed == 0) {
      this.level ++;
      map.velocity += this.levelUpMapSpeed;
      this.levelValue.innerText = this.level;
    }
  }

  updateHealth(rock) {
    this.health -= Math.round(rock.radius);
    this.hpValue.innerText = this.scoreBar.style.width = `${this.health}%`;
    if(this.health < 0 ) this.hpValue.innerText = this.scoreBar.style.width = `0%`;
  }
}

export default Game;