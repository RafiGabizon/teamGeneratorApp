const mongoose = require('mongoose');
const Player = require('./models/Player');

mongoose.connect(process.env.MONGOdb_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = {
  getPlayers: () => Player.find(),
  getPlayer: (id) => Player.findById(id),
  createPlayer: (playerData) => new Player(playerData).save(),
  updatePlayer: (id, playerData) => Player.findByIdAndUpdate(id, playerData, { new: true }),
  deletePlayer: (id) => Player.findByIdAndDelete(id)
};

module.exports = db;