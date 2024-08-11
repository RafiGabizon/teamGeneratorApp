router.get('/', async (req, res) => {
  try {
    const playersDoc = await Player.findOne(); // מניח שיש רק מסמך אחד
    if (!playersDoc) {
      return res.status(404).json({ message: 'No players found' });
    }
    console.log('Number of players:', playersDoc.players.length);
    res.json(playersDoc.players); // שולח רק את מערך השחקנים
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ message: 'Error fetching players' });
  }
});