let rand = require('./rand');

class Map {
	constructor(){
		this._x = 0;
		this._y = 0;
		this.map = [];
		this._legend = {
			bots: [],
			char: '',
			lut: []
		};
	}
	setMap(x, y) {
		this._x = x;
		this._y = y;
		let map = [];
		for(let a = 0; a < x; ++a) {
			map[a] = [];
			for(let b = 0; b < y; ++b) {
				map[a][b] = (function(a, b){
					let rnd = rand(1000)
					if(rnd > 320) {
						return {
							coord: [a, b],
							type: 'emp'
						}
					} else {
						return {
							coord: [a, b],
							type: 'wall'
						}
					}
				})(a, b);
			}
		}
		this.map = map;
	}
	renderMap() {
		let map = '<table>';
		for(let y = this._y-1; y > -1; y--) {
			map += '<tr>';
			for(let x = 0; x < this._x; ++x) {
				if(this.map[x][y].type === 'wall')
					map += '<td class="wall"></td>';
				if(this.map[x][y].type === 'emp')
					map += '<td class="emp"></td>';
				if(this.map[x][y].type === 'char')
					map += '<td class="char"></td>';
				if(this.map[x][y].type === 'bot')
					map += '<td class="bot"></td>';
			}
			map += '</tr>';
		}
		map += '</table>';
		return map;
	}
	radar() {
		let lut = '';
		for(let x = 0; x < this._x; ++x) {
			for(let y = 0; y < this._y; ++y) {
				if(this.map[x][y].sub &&
					this.map[x][y].sub === 'healt')
					lut += `<p class="healt">Healt: x${x},y${y}</p>`;
				if(this.map[x][y].sub &&
					this.map[x][y].sub === 'portal-gun')
					lut += `<p class="portal-gun">PortalGun: x${x},y${y}</p>`;
			}
		}
		return lut;
	}
}

module.exports = Map;