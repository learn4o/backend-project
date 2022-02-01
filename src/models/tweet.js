'use strict'

let data = {
    1: {
        'id': 1,
        'user_id': 100,
        'message': 'This is my first tweet',
        'created_at': '2022-01-31T15:13:22.532Z'
    }
}

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

module.exports = {
    getTweetsOfUser
}