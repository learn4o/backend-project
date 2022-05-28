'use strict'

const tweetModel = require('./../models/tweet')
const userModel = require('./../models/user')
const log = require('./../util/logger')

async function getUserTweets(userId) {
    log.info(`Getting tweets for user: ${userId}`)
    let userDetails = await userModel.getUserDetails(userId)
    let tweets = await tweetModel.getTweetsOfUser(userId)

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

async function saveTweet(tweet) {
    let savedTweet = await tweetModel.saveTweet(tweet)
    let userDetails = await userModel.getUserDetails(tweet.user_id)
    
    savedTweet.user_id = userDetails.id
    savedTweet.user_display_name = userDetails.display_name
    savedTweet.user_handle = userDetails.user_handle
    savedTweet.metrics = getTweetMetrics(savedTweet.id)
    
    return savedTweet
}

function getTweetMetrics(tweetId) {
    return {
        comments: 0
    }
}

module.exports = {
    getUserTweets,
    saveTweet
}