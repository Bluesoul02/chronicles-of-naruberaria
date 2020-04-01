import {GameCreator} from './GameCreator';
import {Win3} from './win3';

export class Niveau3 extends Phaser.Scene {

    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    map: Phaser.GameObjects.TileSprite;
    scrollSpeed = 6;
    mapSize = 6;
    bullets;
    enemies;
    enemyMaxY: number;
    enemyMinY: number;
    score: number;
    scoreText;
    music: Phaser.Loader.FileTypes.AudioFile;
    bonus;
    bonuses;

    constructor() {
      super('niveau3');
    }

  init() {
    GameCreator.init(this);
  }

  preload() {
    GameCreator.preload(this, 'assets/lvl3/map.png',
      'map3', 'assets/lvl3/enemy.png', 'enemy3', 'obstacle3.1',
      'assets/lvl3/building1.png', 'obstacle3.2', 'assets/lvl3/building2.png',
      'music3','assets/lvl3/music3.mp3', 'win3', Win3);
  }

  create() {
    GameCreator.create(this, 'map3','music3');
    GameCreator.createEnemies(this, 'enemy3');
    GameCreator.generateObstacle(this, 'obstacle3.1', 'obstacle3.2');
  }

  update() {
    GameCreator.update(this, 'win3');
  }
}
