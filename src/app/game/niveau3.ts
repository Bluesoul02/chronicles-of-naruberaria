import RandomDataGenerator = Phaser.Math.RandomDataGenerator;
import { Bullets } from "./bullets";
import { Enemies } from "./enemies";
import { Niveau4 } from "./niveau4";

export class Niveau3 extends Phaser.Scene {

    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    map: Phaser.GameObjects.TileSprite;
    scrollSpeed = 2;
    mapSize = 6;
    bullets;
    enemies;
    enemyMaxY: number;
    enemyMinY: number;
    score: number;
    scoreText;

    music: Phaser.Loader.FileTypes.AudioFile;

    constructor(){
      super('niveau3');
    }

    init() {
      this.enemyMaxY = 850;
      this.enemyMinY = 100;
      this.enemies = new Array();
    }

    preload() {
      this.load.image('map3', 'assets/map3.png');
      this.load.image('ship', 'assets/ship.png');
      this.load.image('bullet', 'assets/shmup-bullet.png');
      this.load.image('enemy', 'assets/enemy.png');
      this.load.audio('music', 'assets/music.mp3');
      this.load.audio('crash', 'assets/music.mp3');
      this.scene.add('niveau3',Niveau4,false);
    }

    create() {

      // music
      this.sound.play('music');
      this.sound.volume = 0.2;
      // this.music.addToCache();
      // this.music.on('loop', this);
      // this.music.setLoop(true);

      // map
      this.map = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY,
        this.scale.width * this.mapSize, this.scale.height,
        'map3');
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

      // création de l'arme
      this.bullets = new Bullets(this);

      // création des ennemis
      this.enemies = new Enemies(this);
      for (let i = 0; i < 5; i++) {
        this.enemies.spawnEnemy(600 * (i + 1), 400);
      }


      // collisions des ennemis entre eux
      for (let i = 0; i < this.enemies.getChildren().length; i++) {
        for (let j = i; j < this.enemies.getChildren().length; j++) {
          this.physics.add.collider(this.enemies.getChildren()[i], this.enemies.getChildren()[j]);
        }
      }

      this.score = 0;
      this.scoreText = this.add.text(this.scale.width / 2, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5, 0);

      this.cameras.main.resetFX();
    }

    update() {

      // win
      if (this.win()) {
        this.cameras.main.fade(1000);
        this.time.delayedCall(1500, function() {
            this.scene.start('niveau4');
            console.log("passagae au niveau 4");
          }, [], this);
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

      for (let i = 0; i < this.enemies.getChildren().length; i++) {

        const enemy = this.enemies.getChildren()[i];

        // vérification collision entre joueur et ennemi
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemy.getBounds())) {
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

      for (let i = 0; i < this.bullets.getChildren().length; i++) {
        const bullet = this.bullets.getChildren()[i];

        // vérification de si la bullet est enore à une distance raisonnable du joueur
        if (bullet.x >= this.scale.width + this.cameras.main.scrollX) {
          // destruction de la bullet si trop éloignée du joueur
          bullet.destroy();
          this.bullets.remove(bullet);
          continue;
        }
        for (let j = 0; j < this.enemies.getChildren().length; j++) {
          const enemy = this.enemies.getChildren()[j];
          // vérification de la collision entre bullet et ennemi
          if (Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBounds(), enemy)) {
            // destruction du vaisseau touché et de la bullet
            enemy.destroy();
            this.enemies.remove(enemy);
            // TO DO : REELEMENT ENLEVER UN ENNEMI
            this.bullets.remove(bullet);
            bullet.destroy();
            this.score += 500;
            break;
          }
        }
      }
      this.scoreText.destroy();
      this.scoreText = this.add.text(this.player.x, this.player.y + 15, 'Score :' + this.score, { fontSize: '20px', fill: '#fff' });
    }

    win() {
        return this.player.x >= 3300 || this.time.now > 5000;
    }

    gameOver() {

      this.sound.stopAll();

      // secouer la caméra pour un effet accident
      this.cameras.main.shake(500);

      this.time.delayedCall(250, function() {
        this.cameras.main.fade(1000);
      }, [], this);

      // recommence une partie automatiquement
      this.time.delayedCall(1000, function() {
        this.scene.remove('win');
        this.scene.restart();
      }, [], this);
    }
  }
