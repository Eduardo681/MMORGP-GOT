const mongo = require("mongodb");
let connMongoDb =()=>{
    let db = new mongo.Db(
        'got',
        new mongo.Server(
            'localhost',
            27017,
            {}
        ),
        {}
    );
    return db;
} 
module.exports = () => connMongoDb;