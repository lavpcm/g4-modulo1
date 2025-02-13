export class Player {
  static instance;

  /**
   * @param {Phaser.Scene} scene The scene you're spawning the player on
   * @returns Returns the player instance
   */
  constructor(scene) {
    if (this.instance) {
      this.instance.scene = scene;
      return this.instance;
    }

    this.scene = scene;
    this.instance = this;
  }

  preload() {
    this.scene.load.spritesheet("player", "player.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
  }

  spawn(x, y) {
    // this.sprite = this.scene.physics.add.sprite(x, y, "player").setScale(5, 5);
    this.sprite = this.scene.physics.add.sprite(x, y, "player");
    this.sprite.setCollideWorldBounds(true);
    this.sprite.body.setSize(15, 15, true);
    this.create();
  }

  create() {
    // Define a velocidade que o jogador se move e sua animação padrão
    this.speed = 6;
    this.sprite.play("idle");

    // ================================================================
    // Funcionalidades da câmera

    // Define o zoom padrão da câmera
    this.scene.cameras.main.setZoom(5, 5);
    // Faz a câmera seguir o jogador
    this.scene.cameras.main.startFollow(this.sprite, true, 0.1, 0.1);
  }

  update(time, delta) {
    // ================================================================
    // Funcionalidades de movimento
    // Cálculo de movimento
    let direction = new Phaser.Math.Vector2();

    // Direção horizontal
    if (this.scene.input.keyboard.addKey("A").isDown) {
      direction.x = -1; // Movimento horizontal para esquerda
      this.sprite.setFlipX(false); // Vira o sprite para a esquerda
      this.sprite.play("walk-side", true);
    } else if (this.scene.input.keyboard.addKey("D").isDown) {
      direction.x = 1; // Movimento horizontal para direita
      this.sprite.setFlipX(true); // Vira o sprite para a direita
      this.sprite.play("walk-side", true);
    } else {
      direction.x = 0; // Sem movimento horizontal
    }

    // Direção vertical
    if (this.scene.input.keyboard.addKey("W").isDown) {
      direction.y = -1; // Movimento vertical para cima
      this.sprite.play("walk-up", true);
    } else if (this.scene.input.keyboard.addKey("S").isDown) {
      direction.y = 1; // Movimento vertical para baixo
      this.sprite.play("walk-down", true);
    } else {
      direction.y = 0; // Sem movimento vertical
    }

    // Animações parado
    if (direction.length() === 0) {
      // Verifica se o jogador não está indo para nenhuma direção
      if (this.sprite.anims.getName() == "walk-side") {
        this.sprite.play("idle-side", true);
      } else if (this.sprite.anims.getName() == "walk-up") {
        this.sprite.play("idle-up", true);
      } else if (this.sprite.anims.getName() == "walk-down") {
        this.sprite.play("idle-down", true);
      }
    }

    let velocity = new Phaser.Math.Vector2();

    // Normaliza o Vetor para não ter movimento diagonal mais rápido que o normal
    direction.normalize();

    // Cálculo de velocidade
    velocity.x = direction.x * this.speed * delta;
    velocity.y = direction.y * this.speed * delta;

    // Função de velocidade do Phaser que move o jogador
    this.sprite.body.setVelocity(velocity.x, velocity.y);
  }

  destroy() {
    this.sprite.destroy();
  }
}
