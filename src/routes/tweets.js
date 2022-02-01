'use strict'

const error = require('./../util/error')
const tweetService = require('./../services/tweetService')

function validateUserId(req, res, next) {
    let userId = Number(req.query.user_id)
    if (userId > 0) {
        req.userId = userId
        return next()
    }
    next(error.validationError('Invalid user-id'))
}

function getTweetsOfUser(req, res, next) {
    let tweets = tweetService.getUserTweets(req.userId)
    res.send(tweets)
}

function validateTweet(req, res, next) {
    let tweet = req.body
    tweet.user_id = Number(tweet.user_id)
    
    if (!(tweet.user_id > 0)) {
        return next(error.validationError('Invalid user-id passed'))
    }
    if (tweet.message.length && tweet.message.length <= 0 && tweet.message.length > 150) {
        return next(error.validationError('Invalid tweet found'))
    }

    next()
}

function saveTweet(req, res, next) {
    res.send(tweetService.saveTweet(req.body))
}

module.exports = {
    validateUserId,
    getTweetsOfUser,
    validateTweet,
    saveTweet
}