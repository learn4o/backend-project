'use strict'

class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = "ValidationError"
        Object.setPrototypeOf(this, ValidationError.prototype)
    }
}

module.exports = {
    ValidationError,
    validationError : function (message) {
        return new ValidationError(message)
    }
}