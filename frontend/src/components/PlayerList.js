import React, { useEffect, useState } from 'react';
import playersData from '../players.json';
import './PlayerList.css';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [groups, setGroups] = useState({ red: [], black: [], white: [] });

  useEffect(() => {
    if (Array.isArray(playersData) && playersData.length > 0) {
      const playerData = playersData[0]?.players || [];
      setPlayers(playerData);
    } else {
      console.error('Unexpected data format:', playersData);
      setPlayers([]);
    }
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

    balanceTeams(groups, teamLevels);

    setGroups(groups);
  };

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
              groups[teamA] = groups[teamA].filter(player => player !== playerA);
              groups[teamB] = groups[teamB].filter(player => player !== playerB);

              groups[teamA].push(playerB);
              groups[teamB].push(playerA);

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

        <h3>:רשימת השחקנים הקיימים</h3>
      </div>
      <div className="player-list">
        {
          players.map((player, index) => (
            <div key={player.name} className="player-item">
              <span>{index + 1}. </span>
              <input
                type="checkbox"
                onChange={() => handlePlayerSelect(player)}
                checked={selectedPlayers.some(p => p.name === player.name)}
              />
              {player.name} - {player.playStyle} - רמה {player.level}
            </div>
          ))
      }
      </div>
      <button onClick={handleAssignTeams}>! יאלה כוחות</button>
      <div className="teams">
        <div className="team red">
          <h3>Red Team</h3>
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
