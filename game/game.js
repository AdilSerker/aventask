let Character = require('./character');
let Bot = require('./bot');
let Map = require('./map');
let rand = require('./rand');
let PortalGun = require('./portal');
let Healt = require('./health');

class Game {
	constructor(){
		this.map = new Map();
		this.char = new Character('player');
		this.bot = [];
		this._status = false;
		this.things = {
			healt: [],
			portal: ''
		};
	}
	_makeLut(healt, portal) {
		let i = 0,
			p = 0;

		while(i < healt){
			try {
				let healtPoint = rand(20, 30, 40);
				this.things.healt[i] = new Healt('+20HP', healtPoint);
				this.things.healt[i].spawn(this.map);
				++i;
			} catch(err) {
				console.log(err);
			}
		}
		while(p < portal) {
			try {
				this.things.portal = new PortalGun();
				this.things.portal.spawn(this.map);
				++p;
			} catch(err2) {
				console.log(err2);
			}
		}
	}
	_botSpawn(count){
		let i = 0;
		while(i < count){
			try {
				this.bot[i] = new Bot(`bot_${i+1}`);
				this.bot[i].spawn(this.map);
				++i;
			} catch(err) {
				console.log(err);
			}
		}
	}
	_botMove(n){
		for(let i = 0; i < n; ++i){
			for(let i = 0; i < this.bot.length; ++i){
				let direct = '';
				while(true){
					let rnDirect = rand(5);
					if(rnDirect < 5 && rnDirect > 0) {
						switch(rnDirect){
							case 1:
								direct = 'left';
								break;
							case 2:
								direct = 'forward';
								break;
							case 3:
								direct = 'right';
								break;
							case 4:
								direct = 'backward';
						}
						break;
					} else {
						continue;
					}
				}
				this.bot[i].move(this.map, direct);
			}
		}
	}
	start() {
		this._status = true;
		console.log('Status: run');
		
		this.map.setMap(40,35);
		console.log(this.map);
		
		this.char.spawn(this.map);
		console.log(this.char);
		
		this._botSpawn(50);
		this._makeLut(10, 1);
		console.log(this.bot);
	}
	go(direct) {
		if(this._status) {
			this.char.move(this.map, direct);
			this._botMove(1);
		} else {
			return "запустите игру";
		}
	}
}

module.exports = Game;