const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
      new transports.File({
        filename: 'log/app.log',
        level: 'info'
      }),
      new transports.File({
        filename: 'log/errors.log',
        level: 'error'
      })
    ]
  });

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        level: ["info", "error", "warning"],
        json: false,
        colorize: true
    }));
}

module.exports = logger;
