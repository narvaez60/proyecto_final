const express = require('express');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();
        this.port = 3000;
        this.storePath = '/api/store';
        this.middleware();
        this.routes();
    }

    middleware(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.storePath, require('../routes/store.route'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor ON", this.port);
        });
    }
}

module.exports = Server;
