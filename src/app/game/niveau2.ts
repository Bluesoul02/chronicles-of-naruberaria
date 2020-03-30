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
    GameCreator.preload(this, 'assets/lvl2/map.png', 'map2', 'assets/ship.png',
      'assets/shmup-bullet.png', 'assets/lvl2/enemy.png', 'enemy2',
      'assets/music.mp3', 'assets/music.mp3');
    this.scene.add('niveau3', Niveau3, false);
  }

  create() {
    GameCreator.create(this, 'map2');
    GameCreator.createEnemies(this, 'enemy2');
  }

  update() {
    GameCreator.update(this, 'niveau3');
  }
}
