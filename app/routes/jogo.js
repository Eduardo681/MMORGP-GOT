module.exports = (application)=>{
	application.get('/jogo', (req, res)=>{
		application.app.controllers.jogo.jogo(application,req,res);
	});
	application.get('/sair', (req, res)=>{
		application.app.controllers.jogo.sair(application,req,res);
	});
	application.get('/suditos', (req, res)=>{
		application.app.controllers.jogo.suditos(application,req,res);
	});
	application.post('/ordenarAcao', (req, res)=>{
		application.app.controllers.jogo.ordenarAcao(application,req,res);
	});
	application.get('/pergaminhos', (req, res)=>{
		application.app.controllers.jogo.pergaminhos(application,req,res);
	});
	application.get('/revogar', (req, res)=>{
		application.app.controllers.jogo.revogar(application,req,res);
	});
}