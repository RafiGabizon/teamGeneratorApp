// models/Player.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  playStyle: String,
  level: Number
});

module.exports = mongoose.model('Player', playerSchema);