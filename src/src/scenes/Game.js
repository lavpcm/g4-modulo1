import { Scene } from "phaser";
import { Player } from "../classes/player";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.player = new Player(this);
    this.player.preload();
  }

  create() {
    this.cameras.main.setBackgroundColor(0x00ff00);

    // Creates the player in the scene
    this.player.spawn(640, 360);

    // this.input.once("pointerdown", () => {
    //   this.scene.start("GameOver");
    // });
  }

  update(time, delta) {
    // Executa o método de atualização do jogador
    this.player.update(time, delta);
  }
}
