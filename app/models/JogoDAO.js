let ObjectID = require("mongodb").ObjectId;
function JogoDAO(connection){
    this._connection = connection();
}
JogoDAO.prototype.gerarParametros = function (usuario){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("jogo", function(err, collection){
            collection.insert({
                usuario: usuario,
                moeda: 15,
                suditos: 10,
                temor: Math.floor(Math.random()*1000),
                sabeboria: Math.floor(Math.random()*1000),
                comercio: Math.floor(Math.random()*1000),
                magia:Math.floor(Math.random()*1000)
            });
            mongoclient.close();
        });
    });
}

JogoDAO.prototype.iniciaJogo = function (res,usuario,casa,msg){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("jogo", function(err, collection){
            collection.find({usuario: usuario}).toArray((err,result)=>{
                res.render("jogo",{img_casa: casa, jogo: result[0],msg: msg }); 
            })
            mongoclient.close();
        });
    })
}

JogoDAO.prototype.acao = function (acao){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("acao", function(err, collection){
            let date = new Date();
            let tempo = null;
            switch(parseInt(acao.acao)){
                case 1: tempo = 1*60*60000; break;
                case 2: tempo = 2*60*60000; break;
                case 3: tempo= 5*60*60000; break;
                case 4: tempo = 5*60*60000; break;
            }
            acao.termino = date.getTime() + tempo;
            collection.insert(acao);
            
        });
   
    
        mongoclient.collection("jogo", function(err, collection){
            let moedas = 1;
            switch(parseInt(acao.acao)){
                case 1: moedas = -2 * acao.qtd; break;
                case 2:moedas = -3* acao.qtd; break;
                case 3: moedas= -1* acao.qtd; break;
                case 4: moedas = -1* acao.qtd; break;
            }
            collection.update(
                {usuario : acao.usuario},
                {$inc : {moeda: moedas}}
            );
            mongoclient.close();
        }); 
    });
}

JogoDAO.prototype.getAcoes = function(res,usuario){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("acao", function(err, collection){
            let date = new Date();
            let momento_atual = date.getTime();
            collection.find({usuario: usuario, termino: {$gt: momento_atual}}).toArray((err,result)=>{
                res.render("pergaminhos", {acoes: result }) 
            })
            mongoclient.close();
        });
    })
}
JogoDAO.prototype.revogar = function(_id,res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("acao", function(err, collection){
            collection.remove(
                {_id : ObjectID(_id)},
                (err, result)=>{
                    res.redirect("jogo?mgs=D")
                    mongoclient.close();
                }
            )
        });
    });
}
module.exports = function(){
    return JogoDAO;
}