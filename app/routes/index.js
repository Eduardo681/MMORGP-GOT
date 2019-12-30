module.exports = (application)=>{
	application.get('/', (req, res)=>{
		application.app.controllers.index.index(application,req,res);
	});
	application.post('/autenticar', (req, res)=>{
		application.app.controllers.index.autentificar(application,req,res);
	});
}