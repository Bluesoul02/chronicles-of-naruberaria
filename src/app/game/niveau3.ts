import { Niveau4 } from './niveau4';
import {GameCreator} from './GameCreator';

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

    constructor() {
      super('niveau3');
    }

  init() {
    GameCreator.init(this);
  }

  preload() {
    GameCreator.preload(this, 'assets/lvl3/map.png', 'map3', 'assets/lvl3/enemy.png', 'enemy3', 'building1','assets/lvl3/building1.png','building2', 'assets/lvl3/building2.png',
      'assets/music.mp3', 'niveau4', Niveau4);
  }

  create() {
    GameCreator.create(this, 'map3');
    GameCreator.createEnemies(this, 'enemy3');
    GameCreator.generateObstacle(this, 'building1', 'building2');
  }

  update() {
    GameCreator.update(this, 'niveau4');
  }
}
