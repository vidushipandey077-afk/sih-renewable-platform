import { useState } from 'react';
import HomePage from './HomePage';
import FeasibilityPage from './FeasibilityPage';
import VendorPage from './VendorPage';

function App() {
  const [currentPage, setCurrentPage] =
    useState('home');

  function goHome() {
    setCurrentPage('home');
  }

  return (
    <div>

      {/* HOME */}

      {currentPage === 'home' && (
        <HomePage
          onNavigate={setCurrentPage}
        />
      )}


      {/* FEASIBILITY */}

      {currentPage === 'feasibility' && (

        <div
          style={{
            maxWidth: '480px',
            margin: '20px auto'
          }}
        >

          <button
            className="back-button"
            onClick={goHome}
          >
            ← Back to Home
          </button>

          <FeasibilityPage />

        </div>

      )}


      {/* VENDORS */}

      {currentPage === 'vendors' && (

        <VendorPage
          onBack={goHome}
        />

      )}

    </div>
  );
}

export default App;