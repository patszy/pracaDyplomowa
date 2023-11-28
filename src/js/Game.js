class Game {
  constructor({
    gravity = 0,
    speed = 0,
    jumpPower = 0,
    heroInitialPosition = {
      x: 0,
      y: 0,
      z: 0,
    },
    width = window.innerWidth,
    height = window.innerHeight
  }){
    this.gravity = gravity;
    this.speed = speed;
    this.jumpPower = jumpPower;
    this.heroInitialPosition = heroInitialPosition;
    this.width = width;
    this.height = height;
  }

  setWidthHeight = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
}

export default Game;