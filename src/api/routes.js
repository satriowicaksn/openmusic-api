/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
const routes = (handler) => [
{
    method: 'POST',
    path: '/songs',
    handler: handler.postSongHandler,
},
{
    method: 'GET',
    path: '/songs',
    handler: handler.getSongsHandler,
},
{
    method: 'GET',
    path: '/songs/{songId}',
    handler: handler.getSongByIdHandler,
},
{
    method: 'PUT',
    path: '/songs/{songId}',
    handler: handler.putSongByIdHandler,
},
{
    method: 'DELETE',
    path: '/songs/{songId}',
    handler: handler.deleteSongByIdHandler,
},
];

module.exports = routes;
