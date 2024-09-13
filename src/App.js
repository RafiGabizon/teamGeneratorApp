import React from 'react';
import MainPlayerList from './components/MainPlayerList';
import './App.css';
import logo from './assets/SoccerTeamGen.png';
import pdfFile from './assets/Rafi Gabizon CV_FullStack.pdf';
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

function App() {
  const handlePdfClick = (event) => {
    event.preventDefault();
    window.open(pdfFile, '_blank');
  };

  const handleLinkedinClick = (event) => {
    event.preventDefault();
    window.open('https://www.linkedin.com/in/rafigabizon', '_blank');
  };

  const handleWhatsappClick = (event) => {
    event.preventDefault();
    window.open('https://wa.me/+972525754567', '_blank'); // החלף את yourphonenumber עם מספר הטלפון שלך בוואטסאפ
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
          <button onClick={handlePdfClick} className="pdf-link-button">
            רפי גביזון
          </button>
          <button onClick={handleLinkedinClick} className="pdf-link-button">
            <FaLinkedin />
          </button>
          <button onClick={handleWhatsappClick} className="pdf-link-button">
            <FaWhatsapp />
          </button>
        </p>
      </footer>
    </div>
  );
}

export default App;
