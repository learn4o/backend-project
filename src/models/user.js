'use strict'

const { AssertionError } = require("assert")

let data = require('./../../data/user.json')

function getUserDetails(userId) {
    if (!data[userId]) {
        throw new AssertionError("User data not present")
    }

    return data[userId]
}

module.exports = {
    getUserDetails
}