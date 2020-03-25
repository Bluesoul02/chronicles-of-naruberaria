import {Component} from '@angular/core';
import * as Phaser from 'phaser';


class Game extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  map: Phaser.GameObjects.TileSprite;


  init() {
  }

  preload() {
    this.load.image('map', 'assets/map.png');
    this.load.image('ship', 'assets/ship.png');
  }

  create() {
    this.map = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1443, 320, 'map');
    //this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'map');
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = this.physics.add.sprite(
      50,
      400,
      'ship'
    );
    this.player.setOrigin(0.5);
    this.player.setSize(100, 50);
    this.player.setDisplaySize(100, 50);
    this.player.enableBody(true, 50, 400, true, true);
    this.cameras.main.setSize(500, 320);
    this.cameras.main.centerToSize();
    this.cameras.main.setBounds(0, 160, 1443, 320);
    this.cameras.main.centerOn(this.player.x, this.player.y);
    //this.matter.world.setBounds(0, 0, 1143, 320);
    this.player.setCollideWorldBounds(true, 1, 1);
    //this.cameras.main.startFollow(this.player);
  }

  update() {
    this.cameras.main.setScroll(this.cameras.main.scrollX + 1);
    //this.cameras.main.setPosition(this.cameras.main.x + 1, this.cameras.main.y);
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
    }
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
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
  initialize = true;
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
