import React from 'react';
import '../PlayerList.css';
import redLogo from '../assets/Red_Team_Logo.jpg';
import blueLogo from '../assets/Blue_Team_Logo.jpg';
import whiteLogo from '../assets/White_Team_Logo.jpg';

const TeamsDisplay = ({ groups, clearTeams }) => {  // מוסיפים את clearTeams כ-prop
  const teamLogos = {
    'אדומה': redLogo,
    'שחורה': blueLogo, 
    'לבנה': whiteLogo,
  };

  const teamBackgrounds = {
    'אדומה': 'linear-gradient(135deg, var(--goal-red), #c0532b)',
    'שחורה': 'linear-gradient(135deg, #2f6081, #153042)',
    'לבנה': 'linear-gradient(135deg, #d7eadf, #aac1b4)',
  };

  return (
    <div className="teams-display-container">
      <div className="teams">
        {Object.entries(groups).map(([color, teamPlayers]) => (
          <div key={color} className={`team ${color}`} style={{
            background: teamBackgrounds[color],
          }}>
            <div className="team-logo" style={{
              backgroundImage: `url(${teamLogos[color]})`,
            }}></div>
            <div className="team-content">
              <h3>קבוצה {color}</h3>
              <ul>
                {teamPlayers.map((player, index) => (
                  <li key={index}>{player.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="clear-teams-button-container">
        <button className="clear-teams-button" onClick={clearTeams}>
          נקה קבוצות
        </button>
      </div>
    </div>
  );
};

export default TeamsDisplay;
