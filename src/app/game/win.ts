import Game = Phaser.Game;
import {GameCreator} from "./GameCreator";

export class Win extends Phaser.Scene {

    constructor(config) {
      super(config);
    }

    init(data) {}
    preload() {
      this.load.image('win', 'assets/win.png');
      console.log('menu');
    }

    create(data)  {
        const imageVictoire = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'win');
        imageVictoire.displayWidth = this.scale.width;
        imageVictoire.displayHeight = this.scale.height;
        this.add.text(this.cameras.main.centerX + this.cameras.main.centerX,
          this.cameras.main.centerY + this.cameras.main.centerY / 2,
          GameCreator.globalScore.toString());
    }

    update(time, delta) {}
}
