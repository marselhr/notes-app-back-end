const {
  addNotesHandler,
  readNotesHandler,
  readNotesByIdHandler,
  updateNotesHandler,
  deleteNotesHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: readNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: readNotesByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: updateNotesHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNotesHandler,
  },
];

module.exports = routes;
