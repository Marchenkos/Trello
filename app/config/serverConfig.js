const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const { HOST } = require("./constants");
const Router = require("./routerConfig");
const DB = require("./dbConfig");
const ErrorBoundary = require("./ErrorHandler");
const Validator = require("./Validator");
const logger = require("./logger");

const jsonParser = bodyParser.json();

class Server {
    constructor() {
        this.app = express();
        this.validator = new Validator(this.app);
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
        this.app.use(helmet.permittedCrossDomainPolicies())
        this.app.use(jsonParser);
        this.app.use((req, res, next) => {
            logger.info(req.headers.host, {
                method: req.method,
                ip: req.ip,
                url: req.url
            });

            next();
        });

        this.app.use(this.validator.getValidateSchema.bind(this.validator));
    }

    connectRouters() {
        const router = new Router(this.app);

        router.connect();
    }

    connectErrors() {
        const errorBoundary = new ErrorBoundary(this.app);

        errorBoundary.connect();
    }

    connectDB() {
        const db = new DB();

        db.connect();
    }
}

module.exports = Server;
