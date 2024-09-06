import React, { useState, useEffect } from 'react';
import '../App.css';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [groups, setGroups] = useState({ אדומה: [], שחורה: [], לבנה: [] });
  const [newPlayer, setNewPlayer] = useState({ name: '', level: 1, playStyle: '' });
  const [editingPlayerIndex, setEditingPlayerIndex] = useState(null);

  const playStyles = ['התקפי', 'הגנתי', 'שוער', 'כל המגרש', 'אמצע המגרש'];

  // טעינת השחקנים מ-localStorage כאשר הקומפוננטה נטענת לראשונה
  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players'));
    if (storedPlayers) {
      setPlayers(storedPlayers);
    }
  }, []);

  // שמירת השחקנים ב-localStorage בכל פעם שרשימת השחקנים מתעדכנת
  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

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
    const newGroups = { אדומה: [], שחורה: [], לבנה: [] };

    sortedPlayers.forEach((player, index) => {
      const teamIndex = index % 3;
      const team = Object.keys(newGroups)[teamIndex];
      newGroups[team].push(player);
    });

    setGroups(newGroups);
  };

  const handleAddOrEditPlayer = () => {
    if (!newPlayer.name || !newPlayer.playStyle) {
      alert('נא למלא את כל הפרטים עבור השחקן.');
      return;
    }

    if (editingPlayerIndex !== null) {
      const updatedPlayers = [...players];
      updatedPlayers[editingPlayerIndex] = newPlayer;
      setPlayers(updatedPlayers);
      setEditingPlayerIndex(null);
    } else {
      setPlayers([...players, newPlayer]);
    }

    setNewPlayer({ name: '', level: 1, playStyle: '' });
  };

  const handleEditPlayer = (index) => {
    setNewPlayer(players[index]);
    setEditingPlayerIndex(index);
  };

  const handleDeletePlayer = (index) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);
  };

  return (
    <div className="player-list-container">
      <div className="instructions-container">
        <h2>בחר בין 13 ל-15 שחקנים:</h2>
        <ul>
          <li>רמה 1 - הכי נמוך, רמה 5 - הכי גבוה.</li>
          <li>אופי שחקנים - התקפי, הגנתי, שוער, כל המגרש, אמצע המגרש.</li>
          <li>יש לבחור לפחות 13 שחקנים ולא יותר מ-15.</li>
        </ul>

        <h3>{editingPlayerIndex !== null ? 'עריכת שחקן' : 'הוספת שחקן חדש'}</h3>
        <div className="player-form">
          <input
            type="text"
            placeholder="שם השחקן"
            value={newPlayer.name}
            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="רמה (1-5)"
            value={newPlayer.level}
            min="1"
            max="5"
            onChange={(e) => setNewPlayer({ ...newPlayer, level: parseInt(e.target.value) })}
          />
          <select
            value={newPlayer.playStyle}
            onChange={(e) => setNewPlayer({ ...newPlayer, playStyle: e.target.value })}
          >
            <option value="">בחר אופי משחק</option>
            {playStyles.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
          <button onClick={handleAddOrEditPlayer}>
            {editingPlayerIndex !== null ? 'עדכן שחקן' : 'הוסף שחקן'}
          </button>
        </div>

        <h3>רשימת השחקנים:</h3>
      </div>
      
      {players.length === 0 ? (
        <p className="no-players">לא נוספו שחקנים למערכת.</p>
      ) : (
        <div className="player-list">
          {players.map((player, index) => (
            <div key={player.name} className="player-item">
              <div className="player-info">
                <input
                  type="checkbox"
                  onChange={() => handlePlayerSelect(player)}
                  checked={selectedPlayers.some(p => p.name === player.name)}
                />
                <div className="player-details">
                  <span className="player-name">{player.name}</span>
                  <span className="player-style">{player.playStyle}</span>
                  <span className="player-level">רמה: {player.level}</span>
                </div>
              </div>
              <div className="player-actions">
                <button onClick={() => handleEditPlayer(index)}>ערוך</button>
                <button onClick={() => handleDeletePlayer(index)}>מחק</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="assign-teams-button" onClick={handleAssignTeams}>יאללה כוחות!</button>
      
      <div className="teams">
        {Object.entries(groups).map(([color, teamPlayers]) => (
          <div key={color} className={`team ${color === 'אדומה' ? 'red' : color === 'שחורה' ? 'black' : 'white'}`}>
            <h3>קבוצה {color}</h3>
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
