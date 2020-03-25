import {Component} from '@angular/core';
import * as Phaser from 'phaser';


class Game extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  cursors;

  init() {
  }

  preload() {
    this.load.image('map', 'assets/map.png');
    this.load.image('ship', 'assets/ship.png');
  }

  create() {
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'map');
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = this.physics.add.sprite(
      100,
      400,
      'ship'
    );
    this.player.setOrigin(0.5);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
    }
  }

  setAngle(angle: number) {
    this.player.angle = angle;
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
    physics: {default: 'arcade'},
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
