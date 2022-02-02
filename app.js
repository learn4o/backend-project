'use strict'

const express = require('express')
const app = express()
const morgan = require('morgan')
const routing = require('./src/routes')
const { validationError, ValidationError } = require('./src/util/error')
const log = require('./src/util/logger')

app.use(morgan('short', {
    stream: {
        write: (message) => log.info(message.trim())
    }
}))

app.use(express.json())
app.use(routing)

app.use((error, req, res, next) => {
    log.error(error)
    if(error instanceof ValidationError) {
        res.status(400)
        res.send({
            "message": error.message
        })
    } else {
        res.status(500)
        res.send({
            "message": "Please try again later"
        })
    }
})

app.use((req, res, next) => {
    log.warn("Invalid route received")
    res.status(404)
    res.end()
})

app.listen(8080)