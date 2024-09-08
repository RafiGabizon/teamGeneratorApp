import React from 'react';
import '../PlayerList.css';
import logo from '../BlueTeam.png';

const TeamsDisplay = ({ groups }) => {
  return (
    <div className="teams">
      {Object.entries(groups).map(([color, teamPlayers]) => (
        <div key={color} className={`team ${color}`}>
        {/* <img src={logo} alt="לוגו קבוצה כחולה" className="logo" /> */}
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
