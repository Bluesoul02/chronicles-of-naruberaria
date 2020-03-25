import {Component} from '@angular/core';
import * as Phaser from 'phaser';


class Game extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite;
  cursors;
  weapon;
  fireButton;

  init() {
  }

  preload() {
    this.load.image('map', 'assets/map.png');
    this.load.image('ship', 'assets/ship.png');
    this.load.image('bullet','assets/shmup-bullet.png')
  }

  create() {

    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'map');

    this.player = this.add.sprite(
      100,
      400,
      'ship'
    );
    this.player.setOrigin(0.5);
    
    this.weapon = this.add.weapon(30, bullet);
    this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    this.weapon.bulletLifespan = 2000;
    this.weapon.bulletSpeed = 600;
    this.weapon.fireRate = 100;
    this.weapon.bulletWorldWrap = true;
    this.weapon.trackSprite(player, 0, 0, true);


    this.cursors = this.input.keyboard.createCursorKeys();
    this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
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
    if(fireButton.isDown){
      weapon.fire();
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
