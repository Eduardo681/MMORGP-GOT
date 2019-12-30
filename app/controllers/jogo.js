module.exports.jogo = (application,req,res)=>{
    if(req.session.autorizado!=true){
        res.render("index",{validacao: {}})
        return;
    } 
    let msg = "";
    if(req.query.msg != ""){
        msg = req.query.msg;

    }
    let connection = application.config.dbConnection;
    let JogoDAO = new application.app.models.JogoDAO(connection);
    let usuario = req.session.usuario;
    let img_casa = req.session.casa; 
    JogoDAO.iniciaJogo(res,usuario,img_casa,msg);
    
} 
module.exports.sair = (application,req,res)=>{
    req.session.destroy((err)=>{
        res.render("index",{validacao: {}})
    })
}
module.exports.suditos = (application,req,res)=>{
    if(req.session.autorizado!=true){
        res.render("index",{validacao: {}})
        return;
    } 
    res.render("aldeoes",{validacao: {}})
}
module.exports.ordenarAcao = (application,req,res)=>{
    let dadosForm = req.body;
    req.assert("acao","Ação deve ser informada").notEmpty();
    req.assert("qtd","Quatidade deve ser informada").notEmpty();
    let error = req.validationErrors();
    if(error){
        res.redirect("jogo?msg=A")
        return
    } 
    let connection = application.config.dbConnection;
    let JogoDAO = new application.app.models.JogoDAO(connection);
    dadosForm.usuario = req.session.usuario;
    JogoDAO.acao(dadosForm);
    res.redirect("jogo?msg=B")
}
module.exports.pergaminhos = (application,req,res)=>{
    if(req.session.autorizado!=true){
        res.render("index",{validacao: {}})
        return;
    } 
    let connection = application.config.dbConnection;
    let JogoDAO = new application.app.models.JogoDAO(connection);
    let usuario = req.session.usuario;
    JogoDAO.getAcoes(res,usuario);
}

module.exports.revogar = (application,req,res)=>{
    let _id = req.query.id;
    console.log(_id)
    let connection = application.config.dbConnection;
    let JogoDAO = new application.app.models.JogoDAO(connection);
    JogoDAO.revogar(_id,res);
}