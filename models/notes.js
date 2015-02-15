var mongoose = require('mongoose');

var NotesSchema = mongoose.Schema({
  message: String,
  photo: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  done: {
    type: Boolean,
    default: false
  },
  slug: String
});

NotesSchema.index({slug: 1});

NotesSchema.pre('save', function(next) {
  var slug = this.message.substring(0, 10).replace(/\s/g, '_') + '-' + Date.now();
  this.slug = encodeURIComponent(slug);
  next();
});

mongoose.model('notes', NotesSchema);

module.exports = NotesSchema; 
