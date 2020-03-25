import {Component} from '@angular/core';
import * as Phaser from 'phaser';


class Game extends Phaser.Scene {
  helloWorld: Phaser.GameObjects.Text;
  cursors;

  init() {
  }

  preload() {
    this.load.image('map', 'assets/map.png');
  }

  create() {
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'map');
    this.cursors = this.input.keyboard.createCursorKeys();
    this.helloWorld = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'Hello World', {
        font: '40px Arial',
        fill: '#ffffff'
      }
    );
    this.helloWorld.setOrigin(0.5);

  }

  update() {
    this.helloWorld.angle += 1;
    if (this.cursors.left.isDown) {
      console.log('left');
    } else if (this.cursors.right.isDown) {
      console.log('right');
    }
  }

  setAngle(angle: number) {
    this.helloWorld.angle = angle;
  }
}

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
  game: GameInstance = {
    width: '95%',
    height: '100%',
    type: Phaser.AUTO,
    scene: Game,
    instance: null
  };

  getInstance() {
    return this.game.instance;
  }

  initializeGame() {
    this.initialize = true;
  }

  changeAngle() {
    const instance = this.getInstance();
    instance.scene.scenes.forEach(scene => {
      if (scene.sys.isActive() && scene instanceof Game) {
        scene.setAngle(0);
      }
    });
  }
}
