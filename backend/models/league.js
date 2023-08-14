const mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const leagueSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  image: { type: String, required: true},
  clubs: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Club' }]
});

leagueSchema.plugin(UniqueValidator);

module.exports = mongoose.model('League', leagueSchema);