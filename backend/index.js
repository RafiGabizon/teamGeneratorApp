const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Player = require('./models/Player'); // Import the Player model

const app = express();
const port = 0; // Choose your port

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/soccer').then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// Route to get all players
app.get('/players', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
