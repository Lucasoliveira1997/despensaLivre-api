const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format

const logger = createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log'}),
        new transports.Console()
    ]
})

module.exports = logger