import RandomDataGenerator = Phaser.Math.RandomDataGenerator;

export class Enemy extends  Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
    }

    spawn(x, y) {
        this.body.reset(x, y);
        const random = new RandomDataGenerator();

        if (random.integerInRange(1, 2) === 1) {
            this.setVelocityY(300);
        } else {
            this.setVelocityY(-300);
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}
