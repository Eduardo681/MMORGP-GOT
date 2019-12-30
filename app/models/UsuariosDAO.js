const crypto = require("crypto");
function UsuariosDAO(connection){
    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            usuario.senha = crypto.createHash("md5").update(usuario.senha).digest("hex");
            collection.insert(usuario);
            mongoclient.close();
        });
    });
}
UsuariosDAO.prototype.autentificar = function(usuario,req,res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            usuario.senha = crypto.createHash("md5").update(usuario.senha).digest("hex");
            collection.find(usuario).toArray((err,result)=>{
                if(result[0] != undefined){
                    req.session.autorizado = true;
                    req.session.usuario = result[0].usuario; 
                    req.session.casa = result[0].casa;
                }
                res.redirect("/jogo")
            });
            mongoclient.close();
        });
    });
}
module.exports = function(){
    return UsuariosDAO;
}