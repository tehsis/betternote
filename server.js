var Hapi = require('hapi');

var server = new Hapi.Server();

var routes = require('./routes');

server.connection({
  host: 'localhost',
  port: '3000'
});

server.route(routes);

module.exports = server;
