const logger = require("./logger");

class ErrorBoundary {
    constructor(app) {
        this.routre = app;
    }

    connect() {
        this.routre.use(this.clientErrorHandler);
        this.routre.use(this.errorHandler);
    }

    clientErrorHandler(err, req, res, next) {
        if (req.xhr) {
            logger.error({
                level: 'error',
                message: err.message
            });
            res.status(500).send({ error: 'Something failed!' });
        } else {
          next(err);
        }
    }

    errorHandler(err, req, res, next) {
        logger.error(err.message, {
            method: req.method,
            ip: req.ip,
            url: req.url
        });

        res.status(500);
        res.send(`${err}`);
    }
}

module.exports = ErrorBoundary;
