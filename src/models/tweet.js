'use strict'

const db = require('./db')
const logger = require('./../util/logger')

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

async function saveTweet(tweet) {
    let conn = await db.getConnection()
    let tweetId = await saveTweetInDB(conn, tweet)
    let tweetDetails = await getTweetDetails(conn, tweetId)
    db.releaseConnection(conn)
    return tweetDetails
}

function saveTweetInDB(conn, tweet) {
    return new Promise((resolve, reject) => {
        conn.query({
            sql: 'insert into tweet(id, user_id, message) values(?, ?, ?)',
            timeout: 2000
        }, [null, tweet.user_id, tweet.message], (error, results, fields) => {
            if (error) return reject(error)
            resolve(results.insertId)
        })
    })
}

function getTweetDetails(conn, tweetId) {
    return new Promise((resolve, reject) => {
        conn.query('select id, user_id, message, created_at, likes from tweet where id = ?', tweetId, function (error, results, fields) {
            if (error) return reject(error)
            resolve(results[0])
          });
    })
}

module.exports = {
    getTweetsOfUser,
    saveTweet
}