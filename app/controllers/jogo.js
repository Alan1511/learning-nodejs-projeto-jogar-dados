/*

	Controller jogo:
	Responsável por:
	- manter uma instância do model
	-Pedir ao model para iniciar o jogo
	-Pedir ao model para lançar os dados
	-Pedir ao model para encerrar o jogo
	-Pedir ao model para iniciar um novo jogo

*/

var jogoModel = undefined;

module.exports.iniciar = function (application, req, res) {
	console.log('controller: iniciar');
	console.log('controller: cria instância de jogo');
	nome = req.body.nome;
	jogoModel = new application.app.models.jogo.Jogo(nome);
	console.log('controller: atualiza view - novoJogo');
	res.render('novoJogo');
}

module.exports.novoLancamento = function(application, req, res){
	console.log('controller: novoLancamento');
	if (jogoModel) {
		console.log('controller: pede para o model fazer novoLancamento');
		var resultado = jogoModel.novoLancamento();
		res.render('novoLancamento', resultado );
	}
}

module.exports.reiniciar = function(application, req, res){
	console.log('controller : reiniciar');
	if (jogoModel){


		var connection = application.config.dbConnection.connection;
		jogoModel.salvarPontuacao(connection, function(error, result){
			console.log(error);

		});

		console.log('controller: pede para o model criar um novo jogo');
		jogoModel.novoJogo();
		console.log('controller: atualizar a view');
		res.render('novoJogo');

	}else {
		console.log('controller: atualizar a view para página principal');
		res.render('home');
	}
}

module.exports.encerrar = function(application, req, res){
	console.log('controller : encerrar');
	jogoModel = undefined;
	res.render('home');
}

module.exports.pontuacao = function(application, req, res){
	console.log('controller : pontuacao');
	var connection = application.config.dbConnection.connection;
	jogoModel.listaPontuacao(connection,
		function(error, result){
		
		console.log(result[0].id);
		
		res.render('listaPontuacao', {lista : result}); 
		/*
		header = {
			'id' : '#',
			'pontuacao' : 'pontuacao'
		};
		operations = {
			'field' : 'id',
			'model' : 'pontuacao'
		};*/
		//res.json({ header : header, data : result, operations : operations});
		
	});
	
	//res.render('listaPontuacao', lista);
}

