import {GameCreator} from './GameCreator';
import {Niveau2} from './niveau2';

export class Win1 extends Phaser.Scene {

    constructor(config) {
      super(config);
    }

    init() {}

    preload() {
      this.load.image('win', 'assets/win.png');
      console.log('menu');
    }

    create()  {
        GameCreator.createWin(this, Niveau2, 'niveau2', 'win');
    }

    update(time, delta) {}
}
