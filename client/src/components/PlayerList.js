import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PlayerList.css';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [groups, setGroups] = useState({ red: [], black: [], white: [] });

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('/api/players');
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    fetchPlayers();
  }, []);

  const handlePlayerSelect = (player) => {
    setSelectedPlayers(prev => {
      const playerIndex = prev.findIndex(p => p.name === player.name);
      if (playerIndex === -1 && prev.length < 15) {
        return [...prev, player];
      } else if (playerIndex !== -1) {
        return prev.filter((_, index) => index !== playerIndex);
      }
      return prev;
    });
  };

  const handleAssignTeams = () => {
    if (selectedPlayers.length < 13 || selectedPlayers.length > 15) {
      alert('נא לבחור בין 13 ל-15 שחקנים.');
      return;
    }

    const sortedPlayers = [...selectedPlayers].sort((a, b) => b.level - a.level);
    const newGroups = { red: [], black: [], white: [] };
    
    sortedPlayers.forEach((player, index) => {
      const teamIndex = index % 3;
      const team = Object.keys(newGroups)[teamIndex];
      newGroups[team].push(player);
    });

    setGroups(newGroups);
  };

  return (
    <div className="player-list-container">
      <div className="instructions-container">
        <h2>בחר לפחות 13 שחקנים ועד 15:</h2>
        <ul>
          <li>רמה 1 - הכי נמוך, רמה 5 - הכי גבוה.</li>
          <li>אופי שחקנים - התקפי, הגנתי, אמצע מגרש, כל המגרש, שוער.</li>
          <li>ניתן להרכיב כוחות מלפחות 13 שחקנים ועד ל-15.</li>
        </ul>
        <h3>:רשימת השחקנים הקיימים</h3>
      </div>
      <div className="player-list">
        {players.map((player, index) => (
          <div key={player.name} className="player-item">
            <span>{index + 1}. </span>
            <input
              type="checkbox"
              onChange={() => handlePlayerSelect(player)}
              checked={selectedPlayers.some(p => p.name === player.name)}
            />
            {player.name} - {player.playStyle} - רמה {player.level}
          </div>
        ))}
      </div>
      <button onClick={handleAssignTeams}>! יאלה כוחות</button>
      <div className="teams">
        {Object.entries(groups).map(([color, teamPlayers]) => (
          <div key={color} className={`team ${color}`}>
            <h3>{color} Team</h3>
            <ul>
              {teamPlayers.map((player, index) => (
                <li key={index}>{player.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;