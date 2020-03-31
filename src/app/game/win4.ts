import { GameCreator } from './GameCreator';
import { Niveau1 } from './niveau1';

export class Win4 extends Phaser.Scene {

  constructor(config) {
    super(config);
  }

  init() { }

  preload() {
    this.load.audio('winMusic', 'assets/lvl4/ff7win.mp3');
    this.load.image('win4', 'assets/lvl4/win.png');
    console.log('menu');
  }

  create() {
    this.sound.play('winMusic');
    this.sound.volume = 0.2;
    GameCreator.createWinToMenu(this, 'win4');
  }

  update(time, delta) { }
}
