import {GameCreator} from './GameCreator';
import {Niveau4} from './niveau4';

export class Win3 extends Phaser.Scene {

  constructor(config) {
    super(config);
  }

  init() {}

  preload() {
    this.load.image('win3', 'assets/lvl3/win.png');
    console.log('menu');
  }

  create()  {
    GameCreator.createWinNextLevel(this, Niveau4, 'niveau4', 'win3');
  }

  update(time, delta) {}
}
