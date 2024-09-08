import React from 'react';
import '../PlayerList.css';

const PlayerItem = ({ player, index, handlePlayerSelect, handleEditPlayer, handleDeletePlayer, isSelected }) => {
  return (
    <div className="player-item">
      <div className="player-info">
        <label className="checkbox-container">
          <input
            type="checkbox"
            onChange={() => handlePlayerSelect(player)}
            checked={isSelected}
          />
          <span className="checkmark"></span>
        </label>
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
  );
};

export default PlayerItem;