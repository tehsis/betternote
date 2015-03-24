require('babel/register');

var Good = require('good');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/notes');

var server = require('./server');

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      args:[{ log: '*', response: '*' }]
    }]
  }
}, function(err) {
  if (err) {
    throw err; // something bad happened loading the plugin
  }

  server.start(function() {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});

server.register({
  register: require('hapi-swagger'),
  options: {
    basePath: 'http://localhost:3000',
    apiVersion: '0.1'
  }
}, function(err) {
  if (err) console.err('Swagger not loaded');
});
