import React from 'react'; 
import '../PlayerList.css';

const PlayerForm = ({ newPlayer, setNewPlayer, handleAddOrEditPlayer, editingPlayerIndex }) => {
  const playStyles = ['התקפי', 'הגנתי', 'שוער', 'כל המגרש', 'אמצע המגרש'];

  return (
    <div className="player-form">
      <h3>{editingPlayerIndex !== null ? 'עריכת שחקן' : 'הוספת שחקן חדש'}</h3>
      <div className="form-row">
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
      </div>
      <button className='add-player-button' onClick={handleAddOrEditPlayer}>
        {editingPlayerIndex !== null ? 'עדכן שחקן' : 'הוסף שחקן'}
      </button>
    </div>
  );
};

export default PlayerForm;
