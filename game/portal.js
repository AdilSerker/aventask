let Lut = require('./lut');

class PortalGun extends Lut{
	constructor(){
		super();
		this.name = 'Portal Gun';
		this._effect = 'создает портал';
		this._charge = 10;
		this._tag = 'portal-gun';
	}
	use(char, map){
		return char.position;
	}
}

module.exports = PortalGun;