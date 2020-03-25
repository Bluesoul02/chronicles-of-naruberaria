import {Component} from '@angular/core';
import * as Phaser from 'phaser';


class Game extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  cursors;
  weapon;
  fireButton;
  bullets;
  lastFired =0;

  init() {
  }

  preload() {
    this.load.image('map', 'assets/map.png');
    this.load.image('ship', 'assets/ship.png');
    this.load.image('bullet','assets/shmup-bullet.png')
  }

  create() {

    var Bullet = new Phaser.Class({

      Extends: Phaser.GameObjects.Image,

      initialize:

      function Bullet (scene)
      {
          Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

          this.speed = Phaser.Math.GetSpeed(400, 1);
      },

      fire: function (x, y)
      {
          this.setPosition(x, y - 50);

          this.setActive(true);
          this.setVisible(true);
      },

      update: function (time, delta)
      {
          this.y -= this.speed * delta;

          if (this.y < -50)
          {
              this.setActive(false);
              this.setVisible(false);
          }
      }
    });

    this.bullets = this.add.group({
      classType: Bullet,
      maxSize: 10,
      runChildUpdate: true
  });

    // this.cameras.add(0, 0, 200, 320, true, 'main');
    this.add.tileSprite(725, 400, 1443, 320, 'map');
    // this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'map');
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
    // this.cameras.getCamera('main').startFollow(this.player, false, 0, 0, 200, 320);
    // this.matter.world.setBounds(0, 0, 1143, 320);
    this.player.setCollideWorldBounds(true, 1, 1);

    //this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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

    if(this.fireButton.isDown){
      var bullet = this.bullets.get();
      if(bullet){
        bullet.fire(this.player.x,this.player.y);
        this.lastFired += 30;
      }
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
    width: '85%',
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
