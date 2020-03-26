class SpaceScene extends Phaser.Scene
{
	constructor() {
		super();
 
		// To keep things clean, I like to initialise empty variables in the constructor
		this.ship;
	}
 
	// Load all the assets
	preload() {
		this.load.image('laser', '/static/img/assets/laserBlue02.png');
		this.load.image('ship', '/static/img/assets/playerShip1_red.png');
	}
 
	create() {
		this.cameras.main.setBackgroundColor(0x1D1923);
		// Add our ship
        this.addShip();
        this.addEvents();
	}
 
	// Create this function
	addShip() {
		const centerX = this.cameras.main.width / 2;
		const bottom = this.cameras.main.height - 90;
		this.ship = this.add.image(centerX, bottom, 'ship')
	}
 
	update() {
    }
    
    addEvents() {
	this.input.on('pointermove', (pointer) => {
		this.ship.x = pointer.x;
    });
}
}