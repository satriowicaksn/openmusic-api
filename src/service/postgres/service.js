/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-underscore-dangle */
/* eslint-disable space-before-blocks */
/* eslint-disable indent */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');
const { mapDBToModel } = require('../../utils/mapping');

class SongsService{
    constructor(){
        this._pool = new Pool();
    }
    async addSong({ title, year, performer, genre, duration }){
        const id = nanoid(16);
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;

        const query = {
            text: 'INSERT INTO song VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            values: [id, title, year, performer, genre, duration, insertedAt, updatedAt],
        };

        const result = await this._pool.query(query);
        if (!result.rows[0].id){
            throw new InvariantError('Lagu gagal ditambahkan');
        }
        return result.rows[0].id;
    }

    async getSongs(){
        const result = await this._pool.query('SELECT id, title, performer FROM song');
        return result.rows.map(mapDBToModel);
    }

    async getSongById(id){
        const query = {
            text: 'SELECT * FROM song WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length){
            throw new NotFoundError('Lagu tidak ditemukan');
        }
        return result.rows.map(mapDBToModel)[0];
    }

    async editSongById(id, { title, year, performer, genre, duration }){
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE song SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, updated_at = $6 WHERE id = $7 RETURNING id',
            values: [title, year, performer, genre, duration, updatedAt, id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui lagu. Id yang diminta tidak ditemukan');
        }
    }

    async deleteSongById(id){
        const query = {
            text: 'DELETE FROM song WHERE id = $1 RETURNING id',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length){
            throw new NotFoundError('Gagal menghapus lagu, Id yang diminta tidak ditemukan');
        }
    }
}
module.exports = SongsService;
