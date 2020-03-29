import { Bullet } from "./bullet";

export class Bullets extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
      super(scene.physics.world, scene);
  
      this.createMultiple({
          frameQuantity: 5,
          key: 'bullet',
          active: false,
          visible: false,
          classType: Bullet
        });
    }
  
    fireBullet(x, y) {
      const bullet = this.getFirstDead(true);
  
      if (bullet) {
          bullet.fire(x, y);
      }
    }
  }