import {Component} from '@angular/core';
import * as Phaser from 'phaser';
import RandomDataGenerator = Phaser.Math.RandomDataGenerator;

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

function win() {
  return false;
}

class Game extends Phaser.Scene {

  player: Phaser.Physics.Arcade.Sprite;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  map: Phaser.GameObjects.TileSprite;
  scrollSpeed = 0.25;
  mapSize = 6;
  bullets;
  enemies = [];
  enemyMaxY;
  enemyMinY;

  music: Phaser.Loader.FileTypes.AudioFile;

  init() {
    this.enemyMaxY = 600;
    this.enemyMinY = 0;
  }

  preload() {
    this.load.image('map', 'assets/map.png');
    this.load.image('ship', 'assets/ship.png');
    this.load.image('bullet', 'assets/shmup-bullet.png');
    this.load.image('enemy', 'assets/enemy.png');
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
      this.sys.canvas.width * this.mapSize, this.sys.canvas.height,
      'map');

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
    // scenes
    this.scene.add('menu', Menu, false);
    this.scene.add('win', Win, true);
    // création de l'arme
    this.bullets = new Bullets(this);

    // création des ennemis et des collisions avec le joueur
    for (let i = 0; i < 5; i++) {
      const enemy = this.physics.add.sprite(500 * (i + 1), 400, 'enemy');
      enemy.setSize(800, 250);
      enemy.setDisplaySize(120, 100);
      enemy.enableBody(true, 500 * (i + 1), 400, true, true);
      this.physics.add.collider(enemy, this.player);
      this.enemies.push(enemy);
    }

    // déplacement des ennemis et collisions entre eux
    for (let i = 0; i < this.enemies.length; i++) {
      for (let j = i; j < this.enemies.length; j++) {
        this.physics.add.collider(this.enemies[i], this.enemies[j]);
      }
    }
  }

  update() {
    // win
    console.log(this.time.now);
    if (this.win()) {
      this.scene.start('win');
      this.scene.setVisible(true, 'win');
    }
    // scrolling
    this.cameras.main.setScroll(this.cameras.main.scrollX + this.scrollSpeed);
    this.physics.world.setBounds(this.cameras.main.scrollX, this.cameras.main.y, this.scale.width, this.scale.height);
    // déplacements
    // player
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-300);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(300);
    }
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
    }

    if (this.cursors.space.isDown) {
      this.bullets.fireBullet(this.player.x + 55, this.player.y + 10);
    }
    // enemies
    const random = new RandomDataGenerator();
    this.enemies.forEach(enemy => {
      if (random.integerInRange(1, 8) >= 5) {
        enemy.setVelocityY(-100); // monte
      } else {
        enemy.setVelocityY(100); // descend
      }
    });
  }

  win() {
    return this.time.now >= 120000;
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
    width: '85%',
    height: '100%',
    scale: {
      mode: Phaser.Scale.ENVELOP,
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
class Win extends Phaser.Scene {

  constructor(config) {
    super(config);
  }

  init(data) {}
  preload() {
    this.load.image('win', 'assets/win.png');
  }
  create(data)  {
    this.add.image(this.scale.width / 2, this.scale.height / 1.5, 'win');
    this.cameras.main.setZoom(0.75);
  }
  update(time, delta) {}

}

class Menu extends Phaser.Scene {

  constructor(config) {
    super(config);
  }

  init(data) {
  }

  preload() {
  }

  create(data) {
  }

  update(time, delta) {
  }

}
