import React from 'react';
import MainPlayerList from './components/MainPlayerList'; // ייבוא קומפוננטת הרשימה הראשית
import './App.css';
import logo from './SoccerTeamGen.png';

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="לוגו מערכת בחירת כוחות" className="logo" />
          <h1>מערכת בחירת כוחות</h1>
        </div>
      </header>
      <main>
        <MainPlayerList /> {/* קומפוננטת הרשימה הראשית */}
      </main>
      <footer className="footer">
        <p>© כל הזכויות שמורות לרפי גביזון</p>
      </footer>
    </div>
  );
}

export default App;
