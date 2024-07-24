import React from 'react';
import PlayerList from './components/PlayerList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Soccer Squad Generator</h1>
      </header>
      <main>
        <PlayerList />
      </main>
    </div>
  );
}

export default App;
