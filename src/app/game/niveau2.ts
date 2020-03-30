import {GameCreator} from './GameCreator';
import {Niveau3} from './niveau3';

export class Niveau2 extends Phaser.Scene {

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

  constructor() {
    super('niveau2');
  }

  init() {
    GameCreator.init(this);
  }

  preload() {
    GameCreator.preload(this, 'assets/lvl1/map.png', 'assets/ship.png',
      'assets/shmup-bullet.png', 'assets/lvl1/enemy.png',
      'assets/music.mp3', 'assets/music.mp3');
    this.scene.add('niveau3', Niveau3, false);
  }

  create() {
    GameCreator.create(this);
    GameCreator.createEnemies(this, 'enemy');
  }

  update() {
    GameCreator.update(this, 'niveau2');
  }
}
