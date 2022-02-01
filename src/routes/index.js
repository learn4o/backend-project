'use strict'

const router = require('express').Router()
const tweets = require('./tweets')


router.get('/tweets', tweets.validateUserId, tweets.getTweetsOfUser)

router.post('/tweets', tweets.validateTweet, tweets.saveTweet)

module.exports = router