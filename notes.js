var mongoose = require('mongoose');
var Joi = require('joi');
var notesSchema = require('./models/notes');
var Notes = mongoose.model('notes');

var notes_fields = 'message photo slug done -_id';

module.exports = {
    get: { 
      handler: (request, reply) => {
        Notes.find({}, notes_fields, (err, notes) => {
          reply({notes: notes});
        });
      },
      jsonp: 'callback',
      description: 'gets notes',
      notes: 'Retrieves all the notes created in the system.',
      tags: ['api']
  },
  getBySlug: {
    handler: (request, reply) => {
      Notes.findOne({slug: request.params.slug}, notes_fields, (err, notes) => {
        reply({notes: [notes]});
      }); 
    },
    validate: {
      params: {
        slug: Joi.string().min(3).description('The slug to access the note.')  
      }
    },
    description: 'Retrieves a note using its slug.',
    tags: ['api']
  },
  post: {
    handler: (request, reply) => {
      var note = new Notes({
        message: request.payload.note.message,
        done: request.payload.note.done
      });

      note.save((err, notes) => {
        reply({notes: [notes]});
      });
    },
    validate: {
      payload: {
        note: {
          message: Joi.string().required().max(140).description('The note\'s message'),
          done: Joi.boolean().description('Determines if the note has been resolved.'),
          slug: Joi.not().required()
        }
      }
    },
    description: 'Saves a new note',
    tags: ['api']
  },
  deleteBySlug: {
    handler: (request, reply) => {
      Notes.findOneAndRemove({slug: request.params.slug}, (err) => {
        reply(200);
      })
    }
  }
};
