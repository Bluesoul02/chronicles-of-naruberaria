import { Enemy } from './enemy';

export class Enemies extends Phaser.Physics.Arcade.Group {
    texture;
    constructor(scene, texture: string) {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 1,
            key: texture,
            active: true,
            visible: true,
            classType: Enemy
        });

        this.texture = texture;
    }

    spawnEnemy(x, y) {
        const enemy = this.getFirstDead(true, x, y, this.texture);
        enemy.setSize(this.texture.width, this.texture.height);
        enemy.setDisplaySize(180, 160);
        if (enemy) {
            enemy.spawn(x, y);
        }
    }
}
