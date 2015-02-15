var notes = require('./notes');

module.exports = [
  {
    method: 'GET',
    path: '/notes',
    config: notes.get
  },
  {
    method: 'GET',
    path: '/notes/{slug}',
    config: notes.getBySlug
  },
  {
    method: 'POST',
    path: '/notes',
    config: notes.post
  },
  {
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply('hola!');
    }
  }
];
