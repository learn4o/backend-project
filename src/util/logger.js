'use strict'

const winston = require('winston')
const {errors, timestamp, printf, combine} = require('winston').format

const fileOptions = {
    filename: `${__dirname}/../../logs/app.log`,
    maxsize: 50*1024*1024,
    maxFiles: 5
}

const print = printf(
    info => {
        if (info.stack) {
            return `${info.timestamp} [${info.level}]: ${info.message}\n${info.stack}`
        }
        return `${info.timestamp} [${info.level}]: ${info.message}`
    }
)

module.exports = new winston.createLogger({
    level: 'info',
    format: combine(
        errors({stack: true}),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        print
    ),

    transports: [
        new winston.transports.File(fileOptions),
        new (winston.transports.Console)()
    ],
    exitOnError: false,
})