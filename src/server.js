const Hapi = require('@hapi/hapi');
const NotesService = require('./services/inMemory/NotesService');
const notes = require('./api/notes');

const init = async () => {
  const notesService = new NotesService();

  const server = Hapi.server({
    port: 3000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
    },
  });

  await server.start();
  console.log(`Server Berjalan Pada: ${server.info.uri}`);
};

init();
