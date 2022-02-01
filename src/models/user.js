'use strict'

const { AssertionError } = require("assert")

let data = {
    100: {
        id: 100,
        display_name: 'ISRO',
        user_handle: 'isro'
    }
}

function getUserDetails(userId) {
    if (!data[userId]) {
        throw new AssertionError("User data not present")
    }

    return data[userId]
}

module.exports = {
    getUserDetails
}