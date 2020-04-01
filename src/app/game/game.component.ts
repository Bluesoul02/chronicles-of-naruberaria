import {Component} from '@angular/core';
import * as Phaser from 'phaser';
import { Niveau1 } from './niveau1';

interface GameInstance extends Phaser.Types.Core.GameConfig {
  instance: Phaser.Game;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  initialize = false;
  game: GameInstance;

  getInstance() {
    return this.game.instance;
  }

  initializeGame() {
    this.game = {
      width: '85%',
      height: '80%',
      scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      physics: {default: 'arcade'},
      type: Phaser.AUTO,
      scene: Niveau1,
      instance: null
    };
    this.initialize = true;
  }
}
