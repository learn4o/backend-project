'use strict'

const tweetModel = require('./../models/tweet')
const userModel = require('./../models/user')

function getUserTweets(userId) {
    let userDetails = userModel.getUserDetails(userId)
    let tweets = tweetModel.getTweetsOfUser(userId)

    let formattedTweets = []
    for (let tweet of tweets) {
        let tweetCopy = {...tweet}
        tweetCopy.user_id = userDetails.id
        tweetCopy.user_display_name = userDetails.display_name
        tweetCopy.user_handle = userDetails.user_handle
        tweetCopy.metrics = getTweetMetrics(tweetCopy.id)

        formattedTweets.push(tweetCopy)
    }

    return formattedTweets
}

function getTweetMetrics(tweetId) {
    return {
        comments: 0,
        likes: 0
    }
}

module.exports = {
    getUserTweets
}