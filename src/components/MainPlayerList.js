import React, { useState, useEffect } from 'react';
import PlayerForm from './PlayerForm';
import PlayerList from './PlayerList';
import TeamsDisplay from './TeamsDisplay';
import '../PlayerList.css';
import Instructions from './Instructions';
import usePlayers from '../hooks/usePlayers';

const MainPlayerList = () => {
  // רשימת כל השחקנים שנשמרו או הוזנו
  const [players, setPlayers] = usePlayers();

  // רשימת השחקנים שנבחרו להשתתף בחלוקה
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  // אובייקט שמכיל את שלוש הקבוצות שנוצרו
  const [groups, setGroups] = useState({ אדומה: [], שחורה: [], לבנה: [] });

  // השחקן החדש שנמצא כרגע בטופס
  const [newPlayer, setNewPlayer] = useState({ name: '', level: 1, playStyle: '' });

  // אינדקס של שחקן שנערך (אם בכלל)
  const [editingPlayerIndex, setEditingPlayerIndex] = useState(null);


  // בחירה/ביטול של שחקן לרשימת המשתתפים
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

  // כפתור "בחר הכל" / "נקה הכל"
  const toggleSelectAllPlayers = () => {
    if (selectedPlayers.length === players.length) {
      setSelectedPlayers([]);
    } else {
      setSelectedPlayers(players);
    }
  };

  // חלוקת שחקנים לקבוצות באופן אוטומטי
  const handleAssignTeams = () => {
    // ודא שבחרו בין 13 ל-15 שחקנים, אחרת הצג התראה
    if (selectedPlayers.length < 13 || selectedPlayers.length > 15) {
        alert('נא לבחור בין 13 ל-15 שחקנים.');
        return;
    }

    // מיון לפי רמת השחקן מהגבוה לנמוך - נועד לאיזון רמות בין הקבוצות
    const sortedPlayers = [...selectedPlayers].sort((a, b) => b.level - a.level);

    // יצירת קבוצות לפי תפקידים - כדי לנסות לפזר שחקנים לפי עמדות
    const groupedByRole = {
        שוער: [],
        הגנה: [],
        התקפה: [],
        אמצע: [],
        כל: []
    };

    // מיון כל שחקן לפי סגנון המשחק שלו לתוך הרשימה המתאימה
    sortedPlayers.forEach(player => {
        if (groupedByRole[player.playStyle]) {
            groupedByRole[player.playStyle].push(player);
        } else {
            console.warn(`Unknown playStyle: ${player.playStyle}`);
        }
    });

    const newGroups = { אדומה: [], שחורה: [], לבנה: [] };
    const teams = Object.keys(newGroups);

    // פונקציה שמחלקת שחקנים לקבוצות אחת אחת בסבב - לפי הסדר, למניעת עומס בקבוצה מסוימת
    const fillTeams = (players) => {
        let teamIndex = 0;
        players.forEach(player => {
            // דלג לקבוצה הבאה אם הנוכחית כבר עם 5 שחקנים
            while (newGroups[teams[teamIndex]].length >= 5) {
                teamIndex = (teamIndex + 1) % teams.length;
            }
            // הוסף את השחקן לקבוצה הרלוונטית
            newGroups[teams[teamIndex]].push(player);
            teamIndex = (teamIndex + 1) % teams.length;
        });
    };

    // הקצאה ראשונית לפי תפקידים - כל תפקיד נפרד מקבל סבב משלו
    const roles = Object.keys(groupedByRole);
    roles.forEach(role => {
        const playersByRole = groupedByRole[role];
        let teamIndex = 0;
        while (playersByRole.length > 0) {
            // אם בקבוצה יש פחות מ-5, שים שחקן, אחרת עבור לקבוצה הבאה
            if (newGroups[teams[teamIndex]].length < 5) {
                newGroups[teams[teamIndex]].push(playersByRole.shift());
            } else {
                teamIndex = (teamIndex + 1) % teams.length;
            }
        }
    });

    // חישוב שחקנים שלא שובצו (נדיר, קורה אם שחקן לא הוגדר לפי תפקיד)
    const remainingPlayers = sortedPlayers.filter(player => 
        !teams.some(team => newGroups[team].includes(player))
    );

    // מילוי סופי של שחקנים שלא שובצו, אם נותרו
    fillTeams(remainingPlayers);

    // עדכון הסטייט עם הקבוצות שנוצרו
    setGroups(newGroups);
  };

  // הוספת שחקן חדש או עדכון שחקן קיים
  const handleAddOrEditPlayer = () => {
    if (!newPlayer.name) {
      alert('נא להזין שם לשחקן');
      return;
    }
    if (!newPlayer.playStyle){
      alert('עליך לבחור סגנון משחק')
    }
    if (newPlayer.level<1 || newPlayer.level>5){
      alert('נא לבחור רמת משחק בין 1 ל-5');
      return;
    }
    if(player.some(p =>p.name === newPlayer.name && p.id !== newPlayer.id)){
      alert('שחקן זה כבר קיים ברשימת השחקנים');
      return;
    }
    if (editingPlayerIndex !== null) {
      const updatedPlayers = [...players];
      updatedPlayers[editingPlayerIndex] = newPlayer;
      setPlayers(updatedPlayers);
      setEditingPlayerIndex(null);
    } else {
      setPlayers(prev => [...prev, { ...newPlayer, id: Date.now()}]);
    }

    setNewPlayer({ name: '', level: 1, playStyle: '' });
  };

  // עריכת שחקן (מילוי הטופס לפי נתוניו)
  const handleEditPlayer = (index) => {
    setNewPlayer(players[index]);
    setEditingPlayerIndex(index);
  };

  // מחיקת שחקן מהרשימה
  const handleDeletePlayer = (index) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);
  };

  // איפוס הקבוצות המוצגות
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
