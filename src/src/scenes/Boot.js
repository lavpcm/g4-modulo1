import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    // Carrega os arquivos a serem usado pelo preload
  }

  create() {
    this.scene.start("Preloader");
  }
}
