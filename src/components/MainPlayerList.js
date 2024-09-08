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
      />
    <div className="assign-teams-button-container">
        <button className="assign-teams-button" onClick={handleAssignTeams}>יאללה כוחות!</button>
      </div>
      <TeamsDisplay groups={groups} />
    </div>
  );
};

export default MainPlayerList;
