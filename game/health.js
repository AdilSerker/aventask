let Lut = require('./lut');


class Healt extends Lut {
	constructor(name, points){
		super();
		this.name = name;
		this._effect = points;
		this._discr = `увеличивает здоровье на ${points} поинтов`;
		this._tag = 'healt'
	}
	use(char) {
		char.hitPoints += this._effect;
	}
}

module.exports = Healt;