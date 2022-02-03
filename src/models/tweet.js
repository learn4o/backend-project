'use strict'

const fs = require('fs/promises')

let data = require('./../../data/tweet.json')

const filePath = `${__dirname}/../../data/tweet.json`

function getTweetsOfUser(userId) {
    let tweets = getTweets(userId)
    return tweets
}

function getTweets(userId) {
    let tweets = []
    Object.keys(data).forEach((id) => {
        let tweet = data[id]
        if (tweet.user_id == userId) {
            tweets.push(tweet)
        }
    })

    return tweets
}

function getNextAvailableId() {
    return Object.keys(data).length + 1
}

async function saveTweet(tweet) {
    tweet.id = getNextAvailableId()
    data[tweet.id] = tweet
    await fs.writeFile(filePath, JSON.stringify(data), 'utf-8')
    return data[tweet.id]
}

module.exports = {
    getTweetsOfUser,
    saveTweet
}