'use strict'

const { AssertionError } = require("assert")
const db = require('./db')
const log = require('./../util/logger')

async function getUserDetails(userId) {

    let conn = await db.getConnection()
    let userData = await getUserDetailsOnConnection(conn, userId)
    if (userData.length < 1) {
        throw new AssertionError("User data not present")
    }
    return userData[0]
}

function getUserDetailsOnConnection(conn, userId) {
    return new Promise((resolve, reject) => {
        conn.query('select * from user where id = ?', userId, function (error, results, fields) {
            if (error) return reject(error)
            resolve(results)
        });
    })
}

module.exports = {
    getUserDetails
}