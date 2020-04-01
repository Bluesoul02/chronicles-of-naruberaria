import { Win1 } from './win1';
import {GameCreator} from './GameCreator';
import {Win4} from './win4';

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
    bonus;
    bonuses;

    constructor() {
      super('niveau4');
    }

  init() {
    GameCreator.init(this);
  }

  preload() {
    GameCreator.preload(this, 'assets/lvl4/map.jpg',
      'map4', 'assets/lvl4/enemy.png',
      'enemy4', 'obstacle4.1', 'assets/lvl4/obstacle.png', 'obstacle4.2', 'assets/lvl4/obstacle.png',
      'music4', 'assets/lvl4/music4.mp3', 'win4', Win4);
  }

  create() {
    GameCreator.create(this, 'map4','music4');
    GameCreator.createEnemies(this, 'enemy4');
    GameCreator.generateObstacle(this, 'obstacle4.1', 'obstacle4.2');
  }

  update() {
    GameCreator.update(this, 'win4');
  }
}
