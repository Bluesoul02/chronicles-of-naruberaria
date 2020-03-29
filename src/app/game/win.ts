export class Win extends Phaser.Scene {

    constructor(config) {
      super(config);
    }
  
    init(data) {}
    preload() {
      this.load.image('win', 'assets/win.png');
      console.log('menu');
    }
  
    create(data)  {
      this.add.tileSprite(this.cameras.main.scrollX + this.scale.width / 2, this.cameras.main.y + this.scale.height / 2,
        this.scale.width, this.scale.height, 'win');
    }
  
    update(time, delta) {}
  
  }