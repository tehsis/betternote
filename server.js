var Hapi = require('hapi');

var server = new Hapi.Server();

var routes = require('./routes');

server.connection({
  host: 'localhost',
  port: '3000',
  routes: {cors: true}
});

server.route(routes);

module.exports = server;
