/* eslint-disable quotes */
const Hapi = require('@hapi/hapi');
const notes = require('./api/notes'); //import hapi plugin
const Notesservice = require('./services/inMemory/NotesService');

const init = async () => {
  const notesService = new Notesservice();

  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // assign hapi plugin
  await server.register({
    plugin: notes,
    options: {
      service: notesService,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
