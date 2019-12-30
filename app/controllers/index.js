module.exports.index = (application,req,res)=>{
    res.render("index",{validacao:{}})
}

module.exports.autentificar = (application,req,res)=>{
   let dadosForm = req.body;
   req.assert('usuario',"Usuario não pode ser vazio").notEmpty();
   req.assert('senha',"Senha não pode ser vazia").notEmpty();
   let error = req.validationErrors();
   if(error){
       return res.render("index",{validacao:error})
   }
   let connection = application.config.dbConnection;
   let UsuariosDAO = new application.app.models.UsuariosDAO(connection);
   UsuariosDAO.autentificar(dadosForm,req,res);
}


