const winston = require('winston');
const { Logtail } = require('@logtail/node');
const { LogtailTransport } = require('@logtail/winston');

const logtailToken = process.env.BETTERSTACK_SOURCE_TOKEN;

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: 'logger/app.log' }),
];

if (logtailToken) {
  const logtail = new Logtail(logtailToken);
  transports.push(new LogtailTransport(logtail));
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}] ${message}`)
  ),
  transports,
});

module.exports = logger;
