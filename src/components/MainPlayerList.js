import React, { useState, useEffect } from 'react';
import PlayerForm from './PlayerForm';
import PlayerList from './PlayerList';
import TeamsDisplay from './TeamsDisplay';
import '../PlayerList.css';
import Instructions from './Instructions';

const MainPlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [groups, setGroups] = useState({ אדומה: [], שחורה: [], לבנה: [] });
  const [newPlayer, setNewPlayer] = useState({ name: '', level: 1, playStyle: '' });
  const [editingPlayerIndex, setEditingPlayerIndex] = useState(null);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players'));
    if (storedPlayers) {
      setPlayers(storedPlayers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  const handlePlayerSelect = (player) => {
    setSelectedPlayers((prev) => {
      const isSelected = prev.some(p => p.name === player.name);
      if (!isSelected && prev.length < 15) {
        return [...prev, player];
      } else if (isSelected) {
        return prev.filter(p => p.name !== player.name);
      }
      return prev;
    });
  };

  const toggleSelectAllPlayers = () => {
    if (selectedPlayers.length === players.length) {
      setSelectedPlayers([]);
    } else {
      setSelectedPlayers(players);
    }
  };

  const handleAssignTeams = () => {
    if (selectedPlayers.length < 13 || selectedPlayers.length > 15) {
        alert('נא לבחור בין 13 ל-15 שחקנים.');
        return;
    }

    const sortedPlayers = [...selectedPlayers].sort((a, b) => b.level - a.level);

    const groupedByRole = {
        שוער: [],
        הגנה: [],
        התקפה: [],
        אמצע: [],
        כל: []
    };

    sortedPlayers.forEach(player => {
        if (groupedByRole[player.playStyle]) {
            groupedByRole[player.playStyle].push(player);
        } else {
            console.warn(`Unknown playStyle: ${player.playStyle}`);
        }
    });

    const newGroups = { אדומה: [], שחורה: [], לבנה: [] };
    const teams = Object.keys(newGroups);
    
    const fillTeams = (players) => {
        let teamIndex = 0;
        players.forEach(player => {
            while (newGroups[teams[teamIndex]].length >= 5) {
                teamIndex = (teamIndex + 1) % teams.length;
            }
            newGroups[teams[teamIndex]].push(player);
            teamIndex = (teamIndex + 1) % teams.length;
        });
    };

    const roles = Object.keys(groupedByRole);
    roles.forEach(role => {
        const playersByRole = groupedByRole[role];
        let teamIndex = 0;
        while (playersByRole.length > 0) {
            if (newGroups[teams[teamIndex]].length < 5) {
                newGroups[teams[teamIndex]].push(playersByRole.shift());
            } else {
                teamIndex = (teamIndex + 1) % teams.length;
            }
        }
    });

    const remainingPlayers = sortedPlayers.filter(player => 
        !teams.some(team => newGroups[team].includes(player))
    );

    fillTeams(remainingPlayers);

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

  const handleClearTeams = () => {
    setGroups({ אדומה: [], שחורה: [], לבנה: [] });
  };

  return (
    <div className="player-list-container">
      <Instructions />
      <PlayerForm
        newPlayer={newPlayer}
        setNewPlayer={setNewPlayer}
        handleAddOrEditPlayer={handleAddOrEditPlayer}
        editingPlayerIndex={editingPlayerIndex}
      />
      <PlayerList
        players={players}
        selectedPlayers={selectedPlayers}
        handlePlayerSelect={handlePlayerSelect}
        handleEditPlayer={handleEditPlayer}
        handleDeletePlayer={handleDeletePlayer}
        toggleSelectAllPlayers={toggleSelectAllPlayers}
      />
      <div className="assign-teams-button-container">
        <button className="assign-teams-button" onClick={handleAssignTeams}>
          יאללה כוחות!
        </button>
      </div>
      <TeamsDisplay groups={groups} clearTeams={handleClearTeams} />
    </div>
  );
};

export default MainPlayerList;
