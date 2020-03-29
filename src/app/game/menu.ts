import { Game } from "./game";

export class Menu extends Phaser.Scene{
    constructor() {
      super('menu');
    }
  
    init(){}
  
    preload(){
      this.load.image('menu','assets/menu.png');
      this.scene.add('game',Game, false, {x:0, y:0});
    }
  
    create(){
      this.add.tileSprite(this.cameras.main.x,this.cameras.main.y,1500,1000,'menu');
      this.add.text(500,500,'PLAY',{fill:'#0f0', fontSize:100}).setInteractive().on('pointerdown', ()=> {
          this.scene.start('game');
          this.scene.remove(this);
      });
    }
  
    update(){}
  
  }