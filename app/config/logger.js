const winston = require('winston');
const MESSAGE = Symbol.for('message');

const jsonFormatter = (logEntry) => {
    const base = { timestamp: new Date() };
    const json = Object.assign(base, logEntry)
    logEntry[MESSAGE] = JSON.stringify(json);

    return logEntry;
}

const logger = winston.createLogger({
    level: "info",
    format: winston.format(jsonFormatter)(),
    transports: [ 
        new winston.transports.File({
            filename: "log/app.log",
            level: "info"
        }),
        new winston.transports.File({
            filename: "log/errors.log",
            level: "error"
        })
    ]
});

if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({
        level: ["info", "error", "warning"],
        json: false,
        colorize: true
    }));
}

module.exports = logger;
