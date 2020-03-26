import {Component} from '@angular/core';
import * as Phaser from 'phaser';
import TimerEvent = Phaser.Time.TimerEvent;

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
      super(scene, x, y, 'bullet');
  }

  fire(x, y) {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);

    this.setVelocityX(500);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.y <= -32) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
        frameQuantity: 5,
        key: 'bullet',
        active: false,
        visible: false,
        classType: Bullet
      });
  }

  fireBullet(x, y) {
    const bullet = this.getFirstDead(true);

    if (bullet) {
        bullet.fire(x, y);
    }
  }
}

class Game extends Phaser.Scene {

  player: Phaser.Physics.Arcade.Sprite;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  map: Phaser.GameObjects.TileSprite;
  scrollSpeed = 0.25;
  mapSize = 6;
  bullets;
  music: Phaser.Loader.FileTypes.AudioFile;

  init() {
  }

  preload() {
    this.load.image('map', 'assets/map.png');
    this.load.image('ship', 'assets/ship.png');
    this.load.image('bullet', 'assets/shmup-bullet.png');
    this.load.audio('music', 'assets/music.mp3');
  }

  create() {
    // music
    this.sound.play('music');
    this.sound.volume = 0.3;
    // this.music.addToCache();
    // this.music.on('loop', this);
    // this.music.setLoop(true);
    // map
    this.map = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY,
      this.scale.width * this.mapSize, this.scale.height,
      'map');
    // cursors
    this.cursors = this.input.keyboard.createCursorKeys();
    // player
    this.player = this.physics.add.sprite(
      50, 400,
      'ship'
    );
    this.player.setSize(800, 250);
    this.player.setDisplaySize(120, 100);
    this.player.enableBody(true, 50, 400, true, true);
    this.player.setCollideWorldBounds(true, 0, 0);
    // camera
    this.cameras.main.setSize(this.scale.width, this.scale.height);
    this.cameras.main.centerToSize();
    this.cameras.main.setBounds(0, 0, this.map.width - this.scale.width * (this.mapSize / 2), this.map.height);
    this.cameras.main.centerOn(this.player.x, this.player.y);
    // bullets
    this.bullets = new Bullets(this);

  }

  update() {
    this.cameras.main.setScroll(this.cameras.main.scrollX + this.scrollSpeed);
    this.physics.world.setBounds(this.cameras.main.scrollX, this.cameras.main.y, this.scale.width, this.scale.height);

    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
    }
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(150);
    }

    if (this.cursors.space.isDown) {
      this.bullets.fireBullet(this.player.x + 55, this.player.y + 10);
    }
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
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
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
}
