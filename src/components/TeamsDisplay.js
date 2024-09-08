import React from 'react';
import '../PlayerList.css';

const TeamsDisplay = ({ groups }) => {
  return (
    <div className="teams">
      {Object.entries(groups).map(([color, teamPlayers]) => (
        <div key={color} className={`team ${color}`}>
          <h3>קבוצה {color}</h3>
          <ul>
            {teamPlayers.map((player, index) => (
              <li key={index}>{player.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TeamsDisplay;
