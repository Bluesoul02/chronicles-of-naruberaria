import { Niveau2 } from './niveau2';
import {GameCreator} from './GameCreator';

export class Niveau1 extends Phaser.Scene {

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
      super('niveau1');
    }

    init() {
      GameCreator.init(this);
    }

    preload() {
      GameCreator.preload(this, 'assets/lvl1/map.png', 'map1', 'assets/ship.png',
        'assets/shmup-bullet.png', 'assets/lvl1/enemy.png', 'enemy1',
        'assets/music.mp3', 'assets/music.mp3');
      this.scene.add('niveau2', Niveau2, false);
    }

    create() {
      GameCreator.create(this, 'map1');
      GameCreator.createEnemies(this, 'enemy1');
    }

    update() {
      GameCreator.update(this, 'niveau2');
    }
}
