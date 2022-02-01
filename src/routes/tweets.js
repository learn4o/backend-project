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

module.exports = {
    validateUserId,
    getTweetsOfUser
}