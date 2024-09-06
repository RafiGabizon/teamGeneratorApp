import React, { useState } from 'react';
import './PlayerList.css';

const PlayerList = () => {
  // סטייט לשמירת רשימת השחקנים (ברירת מחדל ריקה)
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [groups, setGroups] = useState({ red: [], black: [], white: [] });

  // סטייט לניהול השחקן החדש שנוסף או עובר עריכה
  const [newPlayer, setNewPlayer] = useState({ name: '', level: 1, playStyle: '' });
  const [editingPlayerIndex, setEditingPlayerIndex] = useState(null); // ניהול מצב עריכה

  // רשימת אפשרויות לאופי השחקן
  const playStyles = ['התקפי', 'הגנתי', 'שוער', 'כל המגרש', 'אמצע המגרש'];
  // פונקציה לבחירת שחקנים
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

  // פונקציה לחלוקת השחקנים לקבוצות
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

  // פונקציה להוספת שחקן חדש לרשימה או לעריכת שחקן קיים
  const handleAddOrEditPlayer = () => {
    if (!newPlayer.name || !newPlayer.playStyle) {
      alert('נא למלא את כל הפרטים עבור השחקן.');
      return;
    }

    if (editingPlayerIndex !== null) {
      // עדכון שחקן קיים במצב עריכה
      const updatedPlayers = [...players];
      updatedPlayers[editingPlayerIndex] = newPlayer;
      setPlayers(updatedPlayers);
      setEditingPlayerIndex(null);
    } else {
      // הוספת שחקן חדש
      setPlayers([...players, newPlayer]);
    }

    setNewPlayer({ name: '', level: 1, playStyle: '' });
  };

  // פונקציה לעריכת שחקן
  const handleEditPlayer = (index) => {
    setNewPlayer(players[index]);
    setEditingPlayerIndex(index);
  };

  // פונקציה להסרת שחקן מהרשימה
  const handleDeletePlayer = (index) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);
  };

  return (
    <div className="player-list-container">
      <div className="instructions-container">
        <h2>בחר לפחות 13 שחקנים ועד 15:</h2>
        <ul>
          <li>רמה 1 - הכי נמוך, רמה 5 - הכי גבוה.</li>
          <li>אופי שחקנים - התקפי, הגנתי, שוער, כל המגרש, אמצע המגרש.</li>
          <li>ניתן להרכיב כוחות מלפחות 13 שחקנים ועד ל-15.</li>
        </ul>

        {/* טופס להוספת או עריכת שחקנים */}
        <h3>{editingPlayerIndex !== null ? 'עריכת שחקן' : 'הוספת שחקן חדש'}:</h3>
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
          <option value="">בחר אופי</option>
          {playStyles.map((style) => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
        <button onClick={handleAddOrEditPlayer}>
          {editingPlayerIndex !== null ? 'עדכן שחקן' : 'הוסף שחקן'}
        </button>

        <h3>רשימת השחקנים הקיימים:</h3>
      </div>
      
      {/* תצוגה אם אין שחקנים */}
      {players.length === 0 ? (
        <p>לא נוספו שחקנים למערכת.</p>
      ) : (
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
              <button onClick={() => handleEditPlayer(index)}>ערוך</button>
              <button onClick={() => handleDeletePlayer(index)}>מחק</button>
            </div>
          ))}
        </div>
      )}

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
