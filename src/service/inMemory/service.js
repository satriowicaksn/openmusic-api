/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable object-curly-newline */
/* eslint-disable space-before-blocks */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */

const { nanoid } = require('nanoid');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');

class SongsService {
    constructor() {
        this._songs = [];
    }
    addSong({ title, year, performer, genre, duration }){
        const id = nanoid(16);
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;
        const newSong = {
        id, title, year, performer, genre, duration, insertedAt, updatedAt,
        };
        this._songs.push(newSong);
        const isSuccess = this._songs.filter((n) => n.id === id).length > 0;
        if (!isSuccess){
            throw new InvariantError('Lagu gagal ditambahkan');
        }
        return id;
    }

    getSongs(){
        return this._songs;
    }

    getSongById(id){
        const songSelected = this._songs.filter((n) => n.id === id)[0];
        if (!songSelected){
            throw new NotFoundError('Lagu tidak ditemukan');
        }
        return songSelected;
    }
    editSongById(id, { title, year, performer, genre, duration }){
        const index = this._songs.findIndex((n) => n.id === id);
        if (index === -1) {
            throw new NotFoundError('Lagu tidak ditemukan');
        }
        const updatedAt = new Date().toISOString();
        this._songs[index] = {
            ...this._songs[index],
            title,
            year,
            performer,
            genre,
            duration,
            updatedAt,
        };
    }
    deleteSongById(id){
        const index = this._songs.findIndex((n) => n.id === id);
        if (index === -1){
            throw new NotFoundError('Lagu tidak ditemukan');
        }
        this._songs.splice(index, 1);
    }
}
module.exports = SongsService;