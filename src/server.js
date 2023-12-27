const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'iZt4nblwg5j38aa8s10posZ',
    routes: {
      cors: {
        origin: ['*'],
      },
    },

  });

  server.route(routes);
  await server.start();

  console.log(`Server Berjalan Pada: ${server.info.uri}`);
};

init();
