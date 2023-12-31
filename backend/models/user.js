const mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
});

userSchema.plugin(UniqueValidator);

module.exports = mongoose.model('User', userSchema);