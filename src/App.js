import React from 'react';
import MainPlayerList from './components/MainPlayerList';
import './App.css';
import logo from './assets/SoccerTeamGen.png';
import pdfFile from './assets/Rafi Gabizon CV_FullStack.pdf';

function App() {
  const handlePdfClick = (event) => {
    event.preventDefault();
    window.open(pdfFile, '_blank');
  };

  return (
    <div className="App">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="לוגו מערכת בחירת כוחות" className="logo" />
          <h1>מערכת בחירת כוחות</h1>
        </div>
      </header>
      <main>
        <MainPlayerList />
      </main>
      <footer className="footer">
        <p>
          © כל הזכויות שמורות ל
          <a href={pdfFile} onClick={handlePdfClick}>
            רפי גביזון
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;