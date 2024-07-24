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
        console.log('Response data:', response.data);
        // אם הנתונים הם מערך של שחקנים ישירות
        setPlayers(response.data);
      })
      .catch(error => {
        console.error('Error fetching players:', error);
        setPlayers([]);
      });
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

  const handleAssignTeams = () => {
    if (selectedPlayers.length < 13 || selectedPlayers.length > 15) {
      alert('Please select 13-15 players.');
      return;
    }

    // מחלקים את השחקנים לפי רמות ואופי
    const sortedPlayers = [...selectedPlayers].sort((a, b) => b.level - a.level);

    const groups = { red: [], black: [], white: [] };
    const teamCounts = { red: 0, black: 0, white: 0 };
    const teamLevels = { red: 0, black: 0, white: 0 };

    sortedPlayers.forEach(player => {
      const smallestTeam = Object.keys(teamCounts).reduce((a, b) => teamCounts[a] < teamCounts[b] ? a : b);
      groups[smallestTeam].push(player);
      teamCounts[smallestTeam]++;
      teamLevels[smallestTeam] += player.level;
    });

    // בדיקה האם הקבוצות מאוזנות לפי רמת השחקנים ואופי השחקנים
    balanceTeams(groups, teamLevels);

    setGroups(groups);
  };

  // פונקציה לאיזון הקבוצות
  const balanceTeams = (groups, teamLevels) => {
    let isBalanced = false;

    while (!isBalanced) {
      isBalanced = true;

      const teamNames = Object.keys(groups);
      for (let i = 0; i < teamNames.length; i++) {
        for (let j = i + 1; j < teamNames.length; j++) {
          const teamA = teamNames[i];
          const teamB = teamNames[j];

          const avgLevelA = teamLevels[teamA] / (groups[teamA]?.length || 1);
          const avgLevelB = teamLevels[teamB] / (groups[teamB]?.length || 1);

          if (Math.abs(avgLevelA - avgLevelB) > 1) {
            const playerA = groups[teamA].find(player => player.level > avgLevelA);
            const playerB = groups[teamB].find(player => player.level < avgLevelB);

            if (playerA && playerB) {
              // מחליפים שחקנים בין הקבוצות
              groups[teamA] = groups[teamA].filter(player => player !== playerA);
              groups[teamB] = groups[teamB].filter(player => player !== playerB);

              groups[teamA].push(playerB);
              groups[teamB].push(playerA);

              // מעדכנים את רמות הקבוצות
              teamLevels[teamA] = teamLevels[teamA] - playerA.level + playerB.level;
              teamLevels[teamB] = teamLevels[teamB] - playerB.level + playerA.level;

              isBalanced = false;
            }
          }
        }
      }
    }
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
        <p>סה"כ שחקנים במערכת: {players.length || 0}</p>
      </div>
      <div className="player-list">
        {players.length > 0 ? (
          players.map((player, index) => (
            <div key={player._id} className="player-item">
              <span>{index + 1}. </span>
              <input
                type="checkbox"
                onChange={() => handlePlayerSelect(player)}
                checked={selectedPlayers.some(p => p._id === player._id)}
              />
              {player.name} - {player.playStyle} - רמה {player.level}
            </div>
          ))
        ) : (
          <p>No players available</p>
        )}
      </div>
      <button onClick={handleAssignTeams}>Assign to Teams</button>
      <div className="teams">
        <div className="team red">
          <h3>Red<br />Team</h3>
          <ul>
            {groups.red.map((player, index) => (
              <li key={index}>{player.name}</li>
            ))}
          </ul>
        </div>
        <div className="team black">
          <h3>Black Team</h3>
          <ul>
            {groups.black.map((player, index) => (
              <li key={index}>{player.name}</li>
            ))}
          </ul>
        </div>
        <div className="team white">
          <h3>White Team</h3>
          <ul>
            {groups.white.map((player, index) => (
              <li key={index}>{player.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
