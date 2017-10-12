function rand() {
	switch(arguments.length) {
		case 0:
			return Math.random();
			break;
		case 1:
			return Math.round(Math.random()
				*arguments[0]);
			break;
		case 2:
			return Math.round(Math.random()
				*(arguments[1]-arguments[0])
					+arguments[0]);
			break;
		default:
			return arguments[rand(arguments.length-1)];
	}
}


module.exports = rand;