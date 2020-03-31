export class Bonus extends  Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bonus');
    }

    spawn(x, y) {
        this.body.reset(x, y);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}
