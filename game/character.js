let Unit = require('./unit');

class Character extends Unit {
	constructor(name) {
		super(name);
		this._tag = 'char';
		this.equip = {
			head: {
				name: 'Шлем'
			}
		}
		this.hitPoints = 100;
	}
}


module.exports = Character;