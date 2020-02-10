const express = require("express");
const bodyParser = require("body-parser");

const { HOST } = require("./constants");
const Router = require("./routerConfig");
const DB = require("./dbConfig");

const jsonParser = bodyParser.json();

class Server {
    constructor() {
        this.app = express();
    }

    start() {
        this.connectMiddlewares();
        this.connectRouters();
        this.connectDB();
        this.connectErrors();

        this.app.listen(HOST, () => {
            console.log("Server is loaded");
        });
    }

    connectMiddlewares() {
        this.app.use(jsonParser);
    }

    connectRouters() {
        const router = new Router(this.app);

        router.connect();
    }

    connectErrors() {
        this.app.use((err, req, res, next) => {
            if (err) {
                res.status(500).send("Something brroken");
            }
        });
    }

    connectDB() {
        const db = new DB();

        db.connect();
    }
}

module.exports = Server;
