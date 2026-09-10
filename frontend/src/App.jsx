import { useState } from 'react';
import HomePage from './HomePage';
import FeasibilityPage from './FeasibilityPage';
import SchemePage from './Schemepage';
import PerformancePage from './PerformancePage';
import UsageOptimizerPage from './UsageOptimizerPage';


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
      {currentPage === 'schemes' && (
        <SchemePage onBack={goHome} />
      )}

      {currentPage === 'performance' && (
        <PerformancePage onBack={goHome} />
      )}

      {currentPage === 'optimizer' && (
        <UsageOptimizerPage onBack={() => setCurrentPage('home')} />
      )}
    </div>
  );
}

export default App;