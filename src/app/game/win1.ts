import {GameCreator} from './GameCreator';
import {Niveau2} from './niveau2';

export class Win1 extends Phaser.Scene {

    constructor(config) {
      super(config);
    }

    init() {}

    preload() {
      this.load.image('win1', 'assets/lvl1/win.png');
    }

    create()  {
        GameCreator.createWinNextLevel(this, Niveau2, 'niveau2', 'win1');
    }

    update(time, delta) {}
}
