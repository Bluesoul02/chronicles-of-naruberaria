import {Bullets} from './bullets';
import {Enemies} from './enemies';

export class GameCreator extends Phaser.Scene {
  static globalScore = 0;

  static createEnemies(scene, textureKey) {
    // création des ennemis
    scene.enemies = new Enemies(scene, textureKey);
    for (let i = 0; i < 5; i++) {
      scene.enemies.spawnEnemy(600 * (i + 1), 400);
    }

    // collisions des ennemis entre eux
    for (let i = 0; i < scene.enemies.getChildren().length; i++) {
      for (let j = i; j < scene.enemies.getChildren().length; j++) {
        scene.physics.add.collider(scene.enemies.getChildren()[i], scene.enemies.getChildren()[j]);
      }
    }
  }

  static init(scene) {
    scene.enemyMaxY = 850;
    scene.enemyMinY = 100;
  }

  static preload(scene, urlMap, mapkey, urlShip, urlBullet, urlEnemy, enemykey, urlMusic, urlCrash) {
    scene.load.image(mapkey, urlMap);
    scene.load.image('ship', urlShip);
    scene.load.image('bullet', urlBullet);
    scene.load.image(enemykey, urlEnemy);
    scene.load.audio('music', urlMusic);
    scene.load.audio('crash', urlCrash);
  }

  static gameOver(scene, nextLevel) {

    scene.sound.stopAll();

    // secouer la caméra pour un effet accident
    scene.cameras.main.shake(500);

    scene.time.delayedCall(250, () => {
      scene.cameras.main.fade(1000);
    }, [], scene);

    // recommence une partie automatiquement
    scene.time.delayedCall(1000, () => {
      scene.scene.remove(nextLevel);
      scene.scene.restart();
    }, [], scene);
  }

  static create(scene, map) {

    // music
    scene.sound.play('music');
    scene.sound.volume = 0.2;
    // scene.music.addToCache();
    // scene.music.on('loop', scene);
    // scene.music.setLoop(true);

    // map
    scene.map = scene.add.tileSprite(scene.cameras.main.centerX, scene.cameras.main.centerY,
      scene.scale.width * scene.mapSize, scene.scale.height,
      map);
    scene.cursors = scene.input.keyboard.createCursorKeys();

    // player
    scene.player = scene.physics.add.sprite(
      50, 400,
      'ship'
    );
    scene.player.setSize(700, 200);
    scene.player.setDisplaySize(180, 160);
    scene.player.enableBody(true, 50, 400, true, true);
    scene.player.setCollideWorldBounds(true, 0, 0);

    // camera
    scene.cameras.main.setSize(scene.scale.width, scene.scale.height);
    scene.cameras.main.centerToSize();
    scene.cameras.main.setBounds(0, 0, scene.map.width - scene.scale.width * (scene.mapSize / 2), scene.map.height);
    scene.cameras.main.centerOn(scene.player.x, scene.player.y);

    // création de l'arme
    scene.bullets = new Bullets(scene);

    scene.score = GameCreator.globalScore;
    scene.scoreText = scene.add.text(scene.scale.width / 2, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5, 0);
    scene.cameras.main.resetFX();
  }

  static update(scene, nextLevel) {

    // win
    if (this.win(scene)) {
      scene.cameras.main.fade(1000);
      scene.time.delayedCall(1000, () => {
        GameCreator.globalScore += scene.score;
        scene.scene.start(nextLevel);
        console.log('passage au', nextLevel);
      }, [], scene);
    }

    // scrolling
    scene.cameras.main.setScroll(scene.cameras.main.scrollX + scene.scrollSpeed);
    scene.physics.world.setBounds(scene.cameras.main.scrollX, scene.cameras.main.y, scene.scale.width, scene.scale.height);

    // déplacements
    // player
    scene.player.setVelocityX(0);
    scene.player.setVelocityY(0);

    if (scene.cursors.up.isDown) {
      scene.player.setVelocityY(-500);
    } else if (scene.cursors.down.isDown) {
      scene.player.setVelocityY(500);
    }
    if (scene.cursors.left.isDown) {
      scene.player.setVelocityX(-500);
    } else if (scene.cursors.right.isDown) {
      scene.player.setVelocityX(500);
    }

    // pour tirer
    if (scene.cursors.space.isDown) {
      scene.bullets.fireBullet(scene.player.x + 55, scene.player.y + 10);
    }

    for (let i = 0; i < scene.enemies.getChildren().length; i++) {

      const enemy = scene.enemies.getChildren()[i];

      // vérification collision entre joueur et ennemi
      if (Phaser.Geom.Intersects.RectangleToRectangle(scene.player.getBounds(), enemy.getBounds())) {
        // si oui alors game over
        this.gameOver(scene, nextLevel);
        break;
      }

      // inverse la direction si atteinte des "bords" de sa ligne
      if (enemy.y >= scene.enemyMaxY) {
        enemy.setVelocityY(-300);
      } else if (enemy.y <= scene.enemyMinY) {
        enemy.setVelocityY(300);
      }
    }

    for (let i = 0; i < scene.bullets.getChildren().length; i++) {
      const bullet = scene.bullets.getChildren()[i];

      // vérification de si la bullet est enore à une distance raisonnable du joueur
      if (bullet.x >= scene.scale.width + scene.cameras.main.scrollX) {
        // destruction de la bullet si trop éloignée du joueur
        bullet.destroy();
        scene.bullets.remove(bullet);
        continue;
      }
      for (let j = 0; j < scene.enemies.getChildren().length; j++) {
        const enemy = scene.enemies.getChildren()[j];
        // vérification de la collision entre bullet et ennemi
        if (Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBounds(), enemy)) {
          // destruction du vaisseau touché et de la bullet
          enemy.destroy();
          scene.enemies.remove(enemy);
          // TO DO : REELEMENT ENLEVER UN ENNEMI
          scene.bullets.remove(bullet);
          bullet.destroy();
          scene.score += 500;
          break;
        }
      }
    }
    scene.scoreText.destroy();
    scene.scoreText = scene.add.text(scene.player.x, scene.player.y + 15, 'Score :' + scene.score, { fontSize: '20px', fill: '#fff' });
  }

  static win(scene) {
    return scene.player.x >= 3300;
  }
}
