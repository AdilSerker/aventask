let express = require('express');
let bodyParser = require('body-parser');
	

let Game = require('./game/game');

let game = new Game();

let app = express();

let urlencodetParser = bodyParser.urlencoded({
	extendet: false
});

let log = '';

app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + "/public"));

app.post('/command', urlencodetParser, function(req, res) {
	if(!req.body)
		return res.sendStatus(400);
	let cache = log;
	switch(req.body.cmd.toLowerCase()) {
		case '':
			log = `${cache}`;
			break;
		case 'start':
			console.log(req.body);
			game.start();
			log = `<p class="correct"> Игра началась </p>
					<p class="correct"> Ваши координаты:
					 x${game.char.position.x}, 
					 y${game.char.position.y} </p><br>`;
			break;
		case 'help':
			console.log(req.body); 
			log = `<p class="help">Список доступных команд:<br>
			<br><b>start</b> - <i>начать игру</i><br>
			<b>ahead/back/left/right</b> - <i>движение</i><br>
			<b>map</b> - <i>посмотреть карту</i><br>
			<b>i</b> - <i>посмотреть инвентарь</i><br>
			<b>radar</b> - <i>узнать расположение предметов</i><br>
			<b>direct</b> - <i>направление</i></p>${cache}`;
			break;
		case 'ahead':
			console.log(req.body);
			game.go('forward');
			if(game.char.output === '') {
				log = `<p class="correct"> Ваши координаты:
					 x${game.char.position.x}, 
					 y${game.char.position.y} </p>${cache}`;
			} else {
				log = `<p class="correct"> ${game.char.output} </p>${cache}`
			}
			
			break;
		case 'back':
			console.log(req.body);
			game.go('backward');
			if(game.char.output === '') {
				log = `<p class="correct"> Ваши координаты:
					 x${game.char.position.x}, 
					 y${game.char.position.y} </p>${cache}`;
			} else {
				log = `<p class="correct"> ${game.char.output} </p>${cache}`
			}
			break;
		case 'left':
			console.log(req.body);
			game.go('left');
			if(game.char.output === '') {
				log = `<p class="correct"> Ваши координаты:
					 x${game.char.position.x}, 
					 y${game.char.position.y} </p>${cache}`;
			} else {
				log = `<p class="correct"> ${game.char.output} </p>${cache}`
			}
			break;
		case 'right':
			console.log(req.body);
			game.go('right');
			if(game.char.output === '') {
				log = `<p class="correct"> Ваши координаты:
					 x${game.char.position.x}, 
					 y${game.char.position.y} </p>${cache}`;
			} else {
				log = `<p class="correct"> ${game.char.output} </p>${cache}`
			}
			break;
		case 'direct':
			console.log(req.body);
			log = `<p class="correct"> Ваше направление:
				 ${game.char.position.direct}</p>${cache}`;
			break;
		case 'map':
			console.log(req.body);
			let minmap = game.map.renderMap();
			log = `Ваши координаты: x${game.char.position.x},y${game.char.position.y}
			${minmap}<br>${cache}`;
			break;
		case 'i':
			console.log(req.body);
			log = `<p>Информация:<br>
			Здоровье - ${game.char.hitPoints}</p>${cache}`;
			break;
		case 'radar':
			let lutList = game.map.radar();
			console.log(req.body);
			console.log(lutList);
			log = `${game.map.radar()}<br>${cache}`;
			break;
		default: 
			log = `<p> Введите <b>help</b> для просмотра доступных команд</p> ${cache}`;
	}
	res.render('index', {
		title: 'Game',
		message: 'command',
		output: log
	});
});
app.get('/command', function(req, res){
	res.render('index', {
		title: 'Game',
		message: 'command'
	});
});

app.get('/', function(req, res){
	res.render('index', {
		title: 'Game',
		message: 'command'
	});
});

app.get('/history', function(req, res) {
	console.log(req , res);
	res.end();
});

app.listen(3000);

console.log('Server is running');