/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable indent */
const InvariantError = require('../exception/InvariantError');
const { SongPayloadSchema } = require('./schema');

const SongValidator = {
    validateSongPayload: (payload) => {
        const validationResult = SongPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = SongValidator;
