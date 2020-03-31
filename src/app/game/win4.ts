import {GameCreator} from './GameCreator';
import {Niveau1} from './niveau1';

export class Win4 extends Phaser.Scene {

  constructor(config) {
    super(config);
  }

  init() {}

  preload() {
    this.load.image('win4', 'assets/lvl4/win.png');
    console.log('menu');
  }

  create()  {
    GameCreator.createWin(this, Niveau1, 'niveau1', 'win4');
  }

  update(time, delta) {}
}
