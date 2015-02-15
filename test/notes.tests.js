require('6to5/register');

var Hapi = require('hapi');
var mongoose = require('mongoose');
var expect = require('chai').expect;
var qs = require('querystring');

require('../models/notes');
var Notes = mongoose.model('notes');


var server = new Hapi.Server();

server.connection({host: 'test'});

server.route(require('../routes'));

beforeEach(function(done) {
  mongoose.connect('mongodb://localhost/notes', done);
});

afterEach(function(done) {
  Notes.remove({}, function() {
    mongoose.disconnect(done);
  })
});

describe('The notes', function() {
  it('can be saved', function(done) {
    server.inject({
      method: 'POST',
      url: '/notes',
      payload: JSON.stringify({
        message: 'this is a test note'
      })
    }, function(res) {
      expect(res.result.notes[0].message).to.equals('this is a test note');
      done();
    });
  });

  it('can be retrieved', function(done) {
    Notes.create({
      message: 'this is a test note'
    }, function() {
      server.inject({
        method: 'GET',
        url: '/notes'
      }, function(res) {
        expect(res.result.notes[0].message).to.equals('this is a test note');
        done(); 
      });
    });
  });

  it('it can be retrieved individually using the slug', function(done) {
    var slug
    Notes.create({
      message: 'this is a test note'
    }, function() {
      server.inject({
        method: 'GET',
        url: '/notes'
      }, function(res) {
          slug = res.result.notes[0].slug;
          server.inject({
          method: 'GET',
          url: '/notes/' + slug
        }, function(res) {
          expect(res.result.notes.length).to.equals(1);
          expect(res.result.notes[0].slug).to.equals(slug);
          done();
        });
      });
    });
  });
});
