import { Win } from './win';
import {GameCreator} from './GameCreator';

export class Niveau4 extends Phaser.Scene {

    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    map: Phaser.GameObjects.TileSprite;
    scrollSpeed = 7;
    mapSize = 6;
    bullets;
    enemies;
    enemyMaxY: number;
    enemyMinY: number;
    score: number;
    scoreText;

    music: Phaser.Loader.FileTypes.AudioFile;

    constructor() {
      super('niveau4');
    }

  init() {
    GameCreator.init(this);
  }

  preload() {
    GameCreator.preload(this, 'assets/lvl4/map.png', 'map4', 'assets/lvl4/enemy.png', 'enemy4', 'obstacle4.1','assets/lvl2/obstacle.png','obstacle4.2', 'assets/lvl2/obstacle.png',
      'assets/music.mp3', 'win', Win);
  }

  create() {
    GameCreator.create(this, 'map4');
    GameCreator.createEnemies(this, 'enemy4');
  }

  update() {
    GameCreator.update(this, 'win');
  }
}
