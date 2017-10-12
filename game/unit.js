let rand = require('./rand');

class Unit {
	constructor(name) {
		this.name = name || 'bot';
		this.hitPoints = 50;
		this.bag = [];
		this.equip = {
			head: '',
			body: ''
		};
		this.position = {
			x: 0,
			y: 0,
			direct: 'N'
		};
		this._tag = 'unit';
		this.output = '';
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
			map.map[x][y].type = this._tag;
			break;
		}
	}
	_step(map, d) {
		try {
			switch(d) {
				case 'N':
					if(!map.map[this.position.x][this.position.y+1] || 
						map.map[this.position.x][this.position.y+1].type === 'wall') {
						console.log('впереди стена');
						console.log(`direct: ${this.position.direct}`);
						this.output = `<b>впереди стена</b><br>
							компас: ${this.position.direct}`;
					} else {
						map.map[this.position.x][this.position.y].type = 'emp';
						++this.position.y;
						map.map[this.position.x][this.position.y].type = this._tag;
						this.output = '';
					}
					break;
				case 'E':
					if(!map.map[this.position.x+1][this.position.y] ||
						map.map[this.position.x+1][this.position.y].type === 'wall') {
						console.log('впереди стена');
						console.log(`direct: ${this.position.direct}`);
						this.output = `<b>впереди стена</b><br>
							компас: ${this.position.direct}`;
					} else {
						map.map[this.position.x][this.position.y].type = 'emp';
						++this.position.x;
						map.map[this.position.x][this.position.y].type = this._tag;
						this.output = '';
					}
					break;
				case 'S':
					if(!map.map[this.position.x][this.position.y-1] ||
						map.map[this.position.x][this.position.y-1].type === 'wall') {
						console.log('впереди стена');
						console.log(`direct: ${this.position.direct}`);
						this.output = `<b>впереди стена</b><br>
							компас: ${this.position.direct}`;
					} else {
						map.map[this.position.x][this.position.y].type = 'emp';
						--this.position.y;
						map.map[this.position.x][this.position.y].type = this._tag;
						this.output = '';
					}
					break;
				case 'W':
					if(!map.map[this.position.x-1][this.position.y] ||
						map.map[this.position.x-1][this.position.y].type === 'wall') {
						console.log('впереди стена');
						console.log(`direct: ${this.position.direct}`);
						this.output = `<b>впереди стена</b><br>
							компас: ${this.position.direct}`;
					} else {
						map.map[this.position.x][this.position.y].type = 'emp';
						--this.position.x;
						map.map[this.position.x][this.position.y].type = this._tag;
						this.output = '';
					}
					break;
			}
		} catch(e) {
			console.log(e);
		}
	}
	move(map, direct) {
		switch(direct) {
			case 'forward':
				if(this.position.direct === 'N') {
					this._step(map, 'N');
				} else
				if(this.position.direct === 'E') {
					this._step(map, 'E');
				} else
				if(this.position.direct === 'S') {
					this._step(map, 'S');
				} else
				if(this.position.direct === 'W') {
					this._step(map, 'W');
				}
				break;
			case 'backward':
				if(this.position.direct === 'N') {
					this.position.direct = 'S';
					this._step(map, 'S');
				} else
				if(this.position.direct === 'E') {
					this.position.direct = 'W';
					this._step(map, 'W');
				} else
				if(this.position.direct === 'S') {
					this.position.direct = 'N';
					this._step(map, 'N');
				} else
				if(this.position.direct === 'W') {
					this.position.direct = 'E';
					this._step(map, 'E');
				}
				break;
			case 'left':
				if(this.position.direct === 'N') {
					this.position.direct = 'W';
					this._step(map, 'W');
				} else
				if(this.position.direct === 'E') {
					this.position.direct = 'N';
					this._step(map, 'N');
				} else
				if(this.position.direct === 'S') {
					this.position.direct = 'E';
					this._step(map, 'E');
				} else
				if(this.position.direct === 'W') {
					this.position.direct = 'S';
					this._step(map, 'S');
				}
				break;
			case 'right':
				if(this.position.direct === 'N') {
					this.position.direct = 'E';
					this._step(map, 'E');
				} else
				if(this.position.direct === 'E') {
					this.position.direct = 'S';
					this._step(map, 'S');
				} else
				if(this.position.direct === 'S') {
					this.position.direct = 'W';
					this._step(map, 'W');
				} else 
				if(this.position.direct === 'W') {
					this.position.direct = 'N';
					this._step(map, 'N');
				}
		}
	}
	damage(value) {
		this.hitPoints = this.hitPoints - value;
	}
}


module.exports = Unit;

