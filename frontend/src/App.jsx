import { useState } from 'react';
import HomePage from './HomePage';
import FeasibilityPage from './FeasibilityPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  function goHome() {
    setCurrentPage('home');
  }

  return (
    <div>
      {currentPage === 'home' && (
        <HomePage onNavigate={setCurrentPage} />
      )}

      {currentPage === 'feasibility' && (
        <div style={{ maxWidth: '480px', margin: '20px auto' }}>
          <button className="back-button" onClick={goHome}>← Back to Home</button>
          <FeasibilityPage />
        </div>
      )}
    </div>
  );
}

export default App;