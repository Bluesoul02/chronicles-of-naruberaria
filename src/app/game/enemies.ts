import { Enemy } from "./enemy";

export class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(scene){
        super(scene.physics.world,scene);

        this.createMultiple({
            frameQuantity: 1,
            key: 'enemy', 
            active: true,
            visible: true,
            classType: Enemy
        });
    }

    spawnEnemy(x, y){
        const enemy = this.getFirstDead(true);
        enemy.setSize(700,200);
        enemy.setDisplaySize(180, 160);
        if(enemy){
            enemy.spawn(x,y);
        }
    }
}