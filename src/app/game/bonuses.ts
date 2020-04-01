import { Bonus } from './bonus';

export class Bonuses extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 1,
            key: 'bonus',
            active: true,
            visible: true,
            classType: Bonus
        });
    }

    spawnBonus(x, y) {
        const bonus = this.getFirstDead(true);
        bonus.setSize(130, 110);
        bonus.setDisplaySize(130, 110);
        if (bonus) {
            bonus.spawn(x, y);
        }
    }
}
