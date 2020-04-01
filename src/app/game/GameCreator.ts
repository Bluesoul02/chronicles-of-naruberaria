import {Bullets} from './bullets';
import {Enemies} from './enemies';
import RandomDataGenerator = Phaser.Math.RandomDataGenerator;
import { Bonuses } from './bonuses';

export class GameCreator extends Phaser.Scene {
  static globalScore: number;

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

  static generateObstacle(scene, keyObstacle1, keyObstacle2) {
    const random = new RandomDataGenerator();
    scene.obstacles = scene.physics.add.staticGroup();
    for (let i = 1; i < 9; i++) {
      let obstacle;
      if (random.integerInRange(1, 2) === 1) {
        obstacle = scene.obstacles.create(900 * (i / 2), scene.scale.height * random.realInRange(0, 1), keyObstacle1);
      } else {
        obstacle = scene.obstacles.create(900 * (i / 2), scene.scale.height * random.realInRange(0, 1), keyObstacle2);
      }
      obstacle.setSize(obstacle.texture.width, obstacle.texture.height);
      scene.physics.add.collider(obstacle, scene.player);
    }
  }

  static init(scene) {
    scene.enemyMaxY = 850;
    scene.enemyMinY = 100;
  }

  static preload(scene, urlMap, mapkey, urlEnemy, enemykey, keyObstacle1, urlObstacle1, keyObstacle2, urlObstacle2, musicKey, urlMusic, winKey, win) {
    scene.load.image(mapkey, urlMap);
    scene.load.image('ship', 'assets/ship.png');
    scene.load.image('bullet', 'assets/shmup-bullet.png');
    scene.load.image(enemykey, urlEnemy);
    scene.load.image(keyObstacle1, urlObstacle1);
    scene.load.image(keyObstacle2, urlObstacle2);
    scene.load.image('portail', 'assets/portail.png');
    scene.load.image('bonus', 'assets/bonus.png');
    scene.load.audio(musicKey, urlMusic);
    scene.load.audio('crash', 'assets/crash.mp3');
    scene.scene.add(winKey, win, false);
  }

  static gameOver(scene, nextLevel) {

    scene.sound.stopAll();
    scene.portail.delete = true;

    // secouer la caméra pour un effet accident
    scene.cameras.main.shake(500);

    scene.time.delayedCall(250, () => {
      scene.cameras.main.fade(1000);
    }, [], scene);

    // recommence une partie automatiquement
    scene.time.delayedCall(1500, () => {
      scene.scene.remove(nextLevel);
      scene.scene.restart();
    }, [], scene);
  }

  static create(scene, map, music) {

    // music
    scene.sound.play(music);
    scene.sound.volume = 0.15;
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

    // portail de fin de niveau
    scene.portail = scene.physics.add.sprite(scene.player.x + 3300, scene.player.y, 'portail');
    scene.portail.setSize(150, 400);
    scene.portail.setDisplaySize(250, 400);
    scene.portail.enableBody(true, scene.player.x + 3300, scene.player.y, true, true);
    scene.portail.body.reset(scene.player.x + 3300, scene.player.y);

    // score du joueur
    scene.score = GameCreator.globalScore;
    scene.scoreText = scene.add.text(scene.scale.width / 2, 16, 'Score: 0', { fontSize: '32px', fill: '#ff0000', fontFamily: 'Gameplay' }).setOrigin(0.5, 0);

    // bonus de tir
    scene.bonuses = new Bonuses(scene);
    scene.bonus = 0;

    scene.cameras.main.resetFX();
  }

  static update(scene, win) {
    // bloqué par un obstacle
    if (scene.player.x < scene.cameras.main.scrollX) {
      this.gameOver(scene, win);
    }

    // win
    if (this.win(scene)) {
      scene.cameras.main.fade(1000);
      scene.time.delayedCall(1500, () => {
        scene.sound.stopAll();
        GameCreator.globalScore = scene.score;
        scene.scene.start(win);
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
      switch (scene.bonus) {
        case (0) :
          scene.bullets.fireBullet(scene.player.getBounds().x + 160, scene.player.getBounds().y + 90);
          break;
        case(1) :
          scene.bullets.fireBullet(scene.player.getBounds().x + 180, scene.player.getBounds().y + 70);
          scene.bullets.fireBullet(scene.player.getBounds().x + 180, scene.player.getBounds().y + 90);
          break;
        case(2) :
          scene.bullets.fireBullet(scene.player.getBounds().x + 185, scene.player.getBounds().y + 70);
          scene.bullets.fireBullet(scene.player.getBounds().x + 185, scene.player.getBounds().y + 80);
          scene.bullets.fireBullet(scene.player.getBounds().x + 185, scene.player.getBounds().y + 90);
          break;
      }
    }

    for (let i = 0; i < scene.enemies.getChildren().length; i++) {

      const enemy = scene.enemies.getChildren()[i];

      // vérification collision entre joueur et ennemi
      if (Phaser.Geom.Intersects.RectangleToRectangle(scene.player.getBounds(), enemy.getBounds())) {
        // si oui alors game over
        this.gameOver(scene, win);
        break;
      }

      // inverse la direction si atteinte des "bords" de sa ligne
      if (enemy.y >= scene.enemyMaxY) {
        enemy.setVelocityY(-500);
      } else if (enemy.y <= scene.enemyMinY) {
        enemy.setVelocityY(500);
      }
    }

    for (let i = 0; i < scene.bullets.getChildren().length; i++) {
      const bullet = scene.bullets.getChildren()[i];
      const random = new RandomDataGenerator();

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
          if (random.integerInRange(1, 5) === 1) {
            scene.bonuses.spawnBonus(enemy.x, enemy.y);
          }
          enemy.destroy();
          scene.enemies.remove(enemy);
          scene.bullets.remove(bullet);
          bullet.destroy();
          scene.score += 500;
          break;
        }
      }
    }

    scene.bonuses.getChildren().forEach(b => {
      if (Phaser.Geom.Intersects.RectangleToRectangle(b.getBounds(), scene.player.getBounds())) {
        if (scene.bonus < 2) {
          scene.bonus += 1;
        }
        b.destroy();
      }
    });

    scene.scoreText.destroy();
    scene.scoreText = scene.add.text(scene.player.x + 15, scene.player.y + 23, 'Score: ' + scene.score, { fontSize: '17px', fill: '#ff0000', fontFamily: 'Gameplay' });


  }

  static win(scene) {
    return Phaser.Geom.Intersects.RectangleToRectangle(scene.player.getBounds(), scene.portail.getBounds());
  }

  static createWin(scene, winKey) {
    const imageVictoire = scene.add.sprite(scene.cameras.main.centerX, scene.cameras.main.centerY, winKey);
    imageVictoire.displayWidth = scene.scale.width;
    imageVictoire.displayHeight = scene.scale.height;
    scene.add.text(scene.cameras.main.centerX + scene.cameras.main.centerX,
      scene.cameras.main.centerY + scene.cameras.main.centerY / 2,
      GameCreator.globalScore.toString());
    imageVictoire.setInteractive();
    return imageVictoire;
  }

  static createWinNextLevel(scene, nextLevel, nextLevelKey, winKey) {
    const imageVictoire = this.createWin(scene, winKey);
    scene.scene.add(nextLevelKey, nextLevel, false);
    imageVictoire.on('pointerup', () => GameCreator.winFunction(scene, nextLevelKey));
  }

  static winFunction(scene, levelKey) {
    scene.scene.start(levelKey);
  }

  static createWinToMenu(scene, winKey) {
    const imageVictoire = this.createWin(scene, winKey);
    scene.add.text(scene.scale.width / 2, 16, 'Score : ' + GameCreator.globalScore,
      { fontSize: '40px', fill: '#603912', fontFamily: 'Gameplay' }).setOrigin(0.5, 0);
    imageVictoire.on('pointerup', () => GameCreator.backToMenu(scene));
  }

  static backToMenu(scene) {
    location.reload();
  }
}
