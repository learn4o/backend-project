'use strict'

const express = require('express')
const app = express()
const routing = require('./src/routes')

app.use(routing)

app.listen(8080)