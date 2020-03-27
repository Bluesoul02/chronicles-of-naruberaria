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
  scrollSpeed = 2;
  mapSize = 6;
  bullets;
  enemies: Array<Phaser.Physics.Arcade.Sprite>;
  enemyMaxY: number;
  enemyMinY: number;
  score: number;
  scoreText;

  music: Phaser.Loader.FileTypes.AudioFile;

  init() {
    this.enemyMaxY = 850;
    this.enemyMinY = 100;
    this.enemies = new Array();
  }

  preload() {
    this.load.image('map', 'assets/map.png');
    this.load.image('ship', 'assets/ship.png');
    this.load.image('bullet', 'assets/shmup-bullet.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.audio('music', 'assets/music.mp3');
    this.load.audio('crash','assets/music.mp3')
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
    this.cursors = this.input.keyboard.createCursorKeys();

    // player
    this.player = this.physics.add.sprite(
      50, 400,
      'ship'
    );
    this.player.setSize(700, 200);
    this.player.setDisplaySize(180, 160);
    this.player.enableBody(true, 50, 400, true, true);
    this.player.setCollideWorldBounds(true, 0, 0);

    // camera
    this.cameras.main.setSize(this.scale.width, this.scale.height);
    this.cameras.main.centerToSize();
    this.cameras.main.setBounds(0, 0, this.map.width - this.scale.width * (this.mapSize / 2), this.map.height);
    this.cameras.main.centerOn(this.player.x, this.player.y);

    // scenes
    // this.scene.add('menu', Menu, false);
    this.scene.add('win', Win, false);

    // création de l'arme
    this.bullets = new Bullets(this);

    // création des ennemis et des collisions avec le joueur
    for (let i = 0; i < 5; i++) {
      const enemy = this.physics.add.sprite(600 * (i + 1), 400, 'enemy');
      enemy.setSize(800, 250);
      enemy.setDisplaySize(120, 100);
      enemy.enableBody(true, 500 * (i + 1), 400, true, true);
      this.enemies.push(enemy);
    }

    // démarrage des moteurs des ennemis et collisions des ennemis entre eux
    for (let i = 0; i < this.enemies.length; i++) {
      const random = new RandomDataGenerator();
      if(random.integerInRange(1,2)==1){
        this.enemies[i].setVelocityY(300);
      }else{
        this.enemies[i].setVelocityY(-300);
      }
      for (let j = i; j < this.enemies.length; j++) {
        this.physics.add.collider(this.enemies[i], this.enemies[j]);
      }
    }

    this.score = 0;

    this.scoreText = this.add.text(this.cameras.main.scrollX/2, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5, 0);

    this.cameras.main.resetFX();
  }

  update() {

    // win
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

    // pour tirer
    if (this.cursors.space.isDown) {
      this.bullets.fireBullet(this.player.x + 55, this.player.y + 10);
    }

    for (let i = 0; i <this.enemies.length; i++) {

      let enemy = this.enemies[i];

      // vérification collision entre joueur et ennemi
      if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemy.getBounds())){
        // si oui alors game over
        this.gameOver();
        break;
      }

      // inverse la direction si atteinte des "bords" de sa ligne
      if (enemy.y >= this.enemyMaxY) {
        enemy.setVelocityY(-300);
      } else if (enemy.y <= this.enemyMinY) {
        enemy.setVelocityY(300);
      }
    }


    for(let i = 0;i<this.bullets.getChildren().length;i++){
      let bullet = this.bullets.getChildren()[i];

      // vérification de si la bullet est enore à une distance raisonnable du joueur
      if(bullet.x >= this.scale.width+this.cameras.main.scrollX){
        // destruction de la bullet si trop éloignée du joueur
        bullet.destroy();
        this.bullets.remove(bullet);
        continue;
      }
      for(let j = 0;j<this.enemies.length;j++){
        let enemy = this.enemies[j];
        // vérification de la collision entre bullet et ennemi
        if (Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBounds(), this.enemies[j].getBounds())) {
          // destruction du vaisseau touché et de la bullet
          this.enemies.slice(j);
          enemy.destroy();
          this.bullets.remove(bullet);
          bullet.destroy();
          this.score += 1;
          this.scoreText.setText('Score : ' + this.score);
          console.log('kill réussi');
          break;
        }
      }
    }
  }

  win() {
      return this.player.x>=3300;
    // return this.time.now >= 5000;
  }

  gameOver(){

    this.sound.stopAll();

    // secouer la caméra pour un effet accident
    this.cameras.main.shake(500);

    this.time.delayedCall(250, function() {
      this.cameras.main.fade(1000);
    }, [], this);

    // recommence une partie automatiquement
    this.time.delayedCall(1000, function() {
      this.scene.remove('menu');
      this.scene.remove('win');
      this.scene.restart();
    }, [], this);

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
    this.add.tileSprite(this.cameras.main.scrollX + this.scale.width / 2, this.cameras.main.y + this.scale.height / 2,
      this.scale.width, this.scale.height, 'win');
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
