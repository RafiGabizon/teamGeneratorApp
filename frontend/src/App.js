import React from 'react';
import PlayerList from './components/PlayerList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>מערכת בחירת כוחות</h1>
      </header>
      <main>
        <PlayerList />
      </main>
      <footer className="footer">
        <p>© כל הזכויות שמורות לרפי גביזון</p>
      </footer>
    </div>
  );
}

export default App;
