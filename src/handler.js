const {nanoid} = require('nanoid');
const notes = require('./notes');

const addNotesHandler = (request, h) => {
  const {title, tags, body} = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const readNotesHandler = (request, h) => {

  if (notes.length < 1) {
    const response = h.response({
      status: 'No Content',
      message: 'Catatan Masih Kosong',
      data: {notes}
    })

    return response;
  }
  const response = h.response({
    status: 'success',
    message: 'Catatan Ditemukan',
    data: {notes},
  });

  return response;
};

const readNotesByIdHandler = (request, h) => {
  const {id} = request.params;

  const note = notes.filter((note) => note.id === id)[0];
  if (note !== undefined) {
    return {
      status: 'success',
      data: {note},
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan Tidak Ditemukan',
    data: [],
  });
  response.code(404);
  return response;
};

const updateNotesHandler = (request, h) => {
  const {id} = request.params;
  const {title, tags, body} = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((n) => n.id === id);


  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteNotesHandler = (request, h) => {
  const {id} = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    return {
      status: 'success',
      message: 'Catatan Berhasil Dihapus',
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNotesHandler,
  readNotesHandler,
  readNotesByIdHandler,
  updateNotesHandler,
  deleteNotesHandler,
};
