/* eslint-disable linebreak-style */
/* eslint-disable space-before-blocks */
/* eslint-disable indent */
/* eslint-disable eol-last */
const ClientError = require('./ClientError');

class NotFoundError extends ClientError{
    constructor(message){
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

module.exports = NotFoundError;