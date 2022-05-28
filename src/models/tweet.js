'use strict'

const fs = require('fs/promises')
const db = require('./db')

let data = require('./../../data/tweet.json')

const filePath = `${__dirname}/../../data/tweet.json`

async function getTweetsOfUser(userId) {
    let conn = await db.getConnection()
    let tweets = await getUserTweets(conn, userId)
    db.releaseConnection(conn)
    return tweets
}

function getUserTweets(conn, userId) {
    return new Promise((resolve, reject) => {
        conn.query('select id, user_id, message, created_at, likes from tweet where user_id = ?', userId, function (error, results, fields) {
            if (error) return reject(error)
            resolve(results)
          });
    })
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