/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable space-before-blocks */
/* eslint-disable padded-blocks */
/* eslint-disable object-curly-newline */
/* eslint-disable indent */
// eslint-disable-next-line consistent-return
const ClientError = require('../exception/ClientError');

class SongsHandler{
    constructor(service, validator){
        this._service = service;
        this._validator = validator;

        this.postSongHandler = this.postSongHandler.bind(this);
        this.getSongsHandler = this.getSongsHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }

async postSongHandler(request, h){
    try {
        this._validator.validateSongPayload(request.payload);
        const { title = 'untitled', year, performer, genre, duration } = request.payload;
        const songId = await this._service.addSong({ title, year, performer, genre, duration });

        const response = h.response({
            status: 'success',
            message: 'Lagu berhasil ditambahkan',
            data: {
                songId,
            },
        });
        response.code(201);
        return response;
    } catch (error) {
        if (error instanceof ClientError){
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(error.statusCode);
            return response;
        }
        const response = h.response({
            status: 'error',
            message: 'Mohon maaf, terjadi kesalahan pada server kami',
        });
        response.code(500);
        return response;
    }
}

async getSongsHandler(){
    const songs = await this._service.getSongs();
    return {
        status: 'success',
        data: {
            songs,
        },
    };
}

async getSongByIdHandler(request, h) {
    try {
        const { songId } = request.params;
        const song = await this._service.getSongById(songId);
        return {
            status: 'success',
            data: {
                song,
            },
        };
    } catch (error){
        if (error instanceof ClientError){
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(error.statusCode);
            return response;
        }
        const response = h.response({
            status: 'error',
            message: 'Mohon maaf, terjadi kesalahan pada server kami',
        });
        response.code(500);
        return response;
    }
}

async putSongByIdHandler(request, h){
    try {
        this._validator.validateSongPayload(request.payload);
        const { songId } = request.params;
        await this._service.editSongById(songId, request.payload);

        return {
            status: 'success',
            message: 'Lagu berhasil diperbarui',
        };
    } catch (error){
        if (error instanceof ClientError){
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(error.statusCode);
            return response;
        }
        const response = h.response({
            status: 'error',
            message: 'Mohon maaf, terjadi kesalahan pada server kami',
        });
        response.code(500);
        return response;
    }
}

async deleteSongByIdHandler(request, h){
    try {
        const { songId } = request.params;
        await this._service.deleteSongById(songId);
        return {
            status: 'success',
            message: 'Lagu berhasil dihapus',
        };
        } catch (error){
            if (error instanceof ClientError){
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
            const response = h.response({
                status: 'error',
                message: 'Mohon maaf, terjadi kesalahan pada server kami',
            });
            response.code(500);
            return response;
        }
}

}
module.exports = SongsHandler;
