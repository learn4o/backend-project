'use strict'

const express = require('express')
const app = express()
const morgan = require('morgan')
const routing = require('./src/routes')
const { validationError, ValidationError } = require('./src/util/error')
const log = require('./src/util/logger')
const YAML = require("yamljs")
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = YAML.load('./swagger.yaml')

app.use(morgan('short', {
    stream: {
        write: (message) => log.info(message.trim())
    }
}))

app.use(express.json())
app.use(routing)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

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

app.listen(8080, () => {
    log.info("Application server started. Listening for client requests")
})