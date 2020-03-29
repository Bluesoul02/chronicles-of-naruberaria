import { Niveau1 } from "./niveau1";

export class Menu extends Phaser.Scene{
    constructor() {
      super('menu');
    }
  
    init(){}
  
    preload(){
      this.load.image('menu','assets/menu.png');
      this.scene.add('niveau1',Niveau1, false, {x:0, y:0});
      this.load.image('bouton','assets/button.png');
    }
  
    create(){
        let imageMenu = this.add.sprite(this.cameras.main.centerX,this.cameras.main.centerY,'menu');
        imageMenu.displayWidth = this.scale.width;
        imageMenu.displayHeight = this.scale.height;
        let bouton = this.add.sprite(3*(this.scale.width/8),7*(this.scale.height/8),'bouton').setInteractive().on('pointerdown',() => {
            this.cameras.main.fade(1000);
            this.time.delayedCall(250, function() {
                this.scene.start('niveau1');
              }, [], this);
        });
        bouton.displayWidth = this.scale.width/3;
        // bouton.displayHeight = this.scale.height/3;
    }
  
    update(){}
  
  }