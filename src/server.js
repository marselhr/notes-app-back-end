const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: '8.219.102.13',
    routes: {
      cors: {
        origin: ['*'],
      },
    },

  });

  server.route(routes);
  await server.start();

  console.log(`Server Berjalan Padaf: ${server.info.uri}`);
};

init();
