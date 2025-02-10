class Main extends Phaser.Scene {
  preload() {}

  create() {}

  update() {}
}

// Configuração básica do jogo
const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 1280,
  height: 720,
  scene: Example,
};

const game = new Phaser.Game(config);
