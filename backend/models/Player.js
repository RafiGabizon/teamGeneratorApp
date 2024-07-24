import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PlayerList.css';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [groups, setGroups] = useState({ red: [], black: [], white: [] });

  useEffect(() => {
    axios.get('http://localhost:5000/players')
      .then(response => {
        const playerData = response.data[0].players;
        setPlayers(playerData);
      })
      .catch(error => console.error('Error fetching players:', error));
  }, []);

  const handlePlayerSelect = (player) => {
    setSelectedPlayers(prev => {
      const newSelection = [...prev];
      const playerIndex = newSelection.findIndex(p => p.name === player.name);

      if (playerIndex === -1 && newSelection.length < 15) {
        newSelection.push(player);
      } else if (playerIndex !== -1) {
        newSelection.splice(playerIndex, 1);
      }

      return newSelection;
    });
  };

  return (
    <div className="player-list-container">
      <div className="player-list">
        <h2>Select 13-15 Players</h2>
        <p>Total players: {players.length}</p>
        {players.map((player, index) => (
          <div key={player.name} className="player-item">
            <span>{index + 1}. </span>
            <input
              type="checkbox"
              onChange={() => handlePlayerSelect(player)}
              checked={selectedPlayers.some(p => p.name === player.name)}
            />
            {player.name} - {player.playStyle} - Level {player.level}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
