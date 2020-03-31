import {GameCreator} from './GameCreator';
import {Niveau3} from './niveau3';

export class Win2 extends Phaser.Scene {

  constructor(config) {
    super(config);
  }

  init() {}

  preload() {
    this.load.image('win2', 'assets/lvl2/win.png');
    console.log('menu');
  }

  create()  {
    GameCreator.createWinNextLevel(this, Niveau3, 'niveau3', 'win2');
  }

  update(time, delta) {}
}
