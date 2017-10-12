let rand = require('./rand');

class Lut {
	constructor(){
		this._effect = '';
		this._discr = 'без описания :С';
		this._tag = 'lut';
		this.position = {
			x: 0,
			y: 0
		}
	}
	about(){
		return {
			effect: this._effect,
			discription: this._discr
		}
	}
	spawn(map) {
		while(true){
			let x = rand(map.map.length),
				y = rand(map.map[0].length);
			if(!map.map[x][y] || 
				map.map[x][y].type === 'wall') {
				continue;
			}
			this.position.x = x;
			this.position.y = y;
			map.map[x][y].sub = this._tag;
			break;
		}
	}
}

module.exports = Lut;