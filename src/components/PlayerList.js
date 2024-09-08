import React from 'react';
import PlayerItem from './PlayerItem';
import '../PlayerList.css';

const PlayerList = ({ players, selectedPlayers, handlePlayerSelect, handleEditPlayer, handleDeletePlayer }) => {
  return (
    <div className="player-list-container">
      <h3>רשימת השחקנים :</h3>
      <div className="player-list">
        {players.length === 0 ? (
          <p className="no-players">לא נוספו שחקנים למערכת.</p>
        ) : (
          
          players.map((player, index) => (
            <PlayerItem
              key={player.name}
              player={player}
              index={index}
              handlePlayerSelect={handlePlayerSelect}
              handleEditPlayer={handleEditPlayer}
              handleDeletePlayer={handleDeletePlayer}
              isSelected={selectedPlayers.some(p => p.name === player.name)}
            />
          ))
        )}
        
      </div>
            {players.length > 0 ? (
          <h5>{`נבחרו ${selectedPlayers.length} מתוך ${players.length} שחקנים שברשימה .`}</h5>
        ):(<h1></h1>)}
    </div>
  );
};

export default PlayerList;