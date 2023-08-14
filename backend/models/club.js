const mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const clubSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true},
  league: { type: mongoose.Types.ObjectId, required: true, ref: 'League' }
});

clubSchema.plugin(UniqueValidator);

module.exports = mongoose.model('Club', clubSchema);