import { Bullet } from './bullet';

export class Bullets extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
      super(scene.physics.world, scene);

      this.createMultiple({
          frameQuantity: 1,
          key: 'bullet',
          active: false,
          visible: false,
          classType: Bullet,
          max: 1
        });
    }

    fireBullet(x, y) {
      const bullet = this.getFirstDead(true);

      if (bullet) {
          bullet.fire(x, y);
      }
    }
}
