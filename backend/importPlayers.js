const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// חיבור ל-MongoDB
mongoose.connect('mongodb://localhost:27017/soccer', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Player = require('./models/Player'); // ודא שהנתיב נכון

// קריאת הנתונים מקובץ JSON
const filePath = path.join(__dirname, '../frontend/players.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const importPlayers = async () => {
  try {
    await Player.deleteMany({});

    const players = data[0].players;
    console.log(`Attempting to import ${players.length} players`);

    const result = await Player.insertMany(players);
    console.log(`Successfully imported ${result.length} players`);

    // בדיקה נוספת
    const count = await Player.countDocuments();
    console.log(`Total players in database: ${count}`);

    const allPlayers = await Player.find({});
    console.log('All players after import:');
    allPlayers.forEach((player, index) => {
      console.log(`${index + 1}. ${player.name}`);
    });

  } catch (error) {
    console.error('Error importing players:', error);
  } finally {
    mongoose.connection.close();
  }
};

importPlayers();
