let Unit = require('./unit');

class Bot extends Unit {
	constructor(name) {
		super(name);
		this._tag = 'bot';
	}
}



module.exports = Bot;
