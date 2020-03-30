export class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
    }

    fire(x, y) {
      this.body.reset(x, y);

      this.setActive(true);
      this.setVisible(true);

      this.setVelocityX(800);
    }

    preUpdate(time, delta) {
      super.preUpdate(time, delta);
    }
}
