'use strict'

class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = "ValidationError"
    }
}

module.exports = {
    validationError : function (message) {
        return new ValidationError(message)
    }
}