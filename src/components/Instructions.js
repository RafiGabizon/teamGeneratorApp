import React from 'react';
import '../PlayerList.css';

const Instructions = () => {
  return (
    <div className="instructions-container">
      <h2>בחר בין 13 ל-15 שחקנים:</h2>
      <ul>
        <li>רמה 1 - הכי נמוך, רמה 5 - הכי גבוה.</li>
        <li>אופי שחקנים - התקפי, הגנתי, שוער, כל המגרש, אמצע המגרש.</li>
        <li>יש לבחור לפחות 13 שחקנים ולא יותר מ-15.</li>
      </ul>
    </div>
  );
};

export default Instructions;
