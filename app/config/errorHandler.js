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
          res.status(500).send({ error: 'Something failed!' });
        } else {
          next(err);
        }
    }

    errorHandler(err, req, res, next) {
        res.status(500);
        res.send("Error!");
    }
}

module.exports = ErrorBoundary;
