'use strict'

const router = require('express').Router()
const tweets = require('./tweets')


router.get('/tweets', tweets.validateUserId, tweets.getTweetsOfUser)

module.exports = router