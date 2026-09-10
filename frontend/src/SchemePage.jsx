import React, { useState } from 'react';
import SchemeCard from './components/SchemeCard';
import './SchemePage.css';

const INDIAN_STATES = [
  "Select State",
  "Uttar Pradesh", "Maharashtra", "Gujarat", "Delhi", "Rajasthan",
  "Karnataka", "Tamil Nadu", "Telangana", "Haryana", "Punjab",
  "Kerala", "Madhya Pradesh", "Andhra Pradesh", "West Bengal", "Odisha",
  "Bihar", "Jharkhand", "Chhattisgarh", "Uttarakhand", "Himachal Pradesh",
  "Goa", "Assam", "Jammu & Kashmir", "Ladakh", "Sikkim",
  "Meghalaya", "Tripura", "Mizoram", "Nagaland", "Manipur",
  "Arunachal Pradesh", "Chandigarh", "Puducherry", "Andaman & Nicobar",
  "Dadra & Nagar Haveli and Daman & Diu", "Lakshadweep"
];

const SECTOR_OPTIONS = [
  { label: "Select Sector", value: "DEFAULT_SECTOR" },
  { label: "Residential (Homes & Apartments)", value: "Residential" },
  { label: "Commercial (Offices, Malls, Retail)", value: "Commercial" },
  { label: "Manufacturing & Heavy Industry", value: "Manufacturing" },
  { label: "Services & IT Parks", value: "Services" },
  { label: "Agriculture & Cold Storage", value: "Agriculture" },
  { label: "Institutional (Hospitals, Colleges)", value: "Institutional" }
];

const ORG_TYPE_OPTIONS = [
  { label: "Select Org Type", value: "DEFAULT_ORG" },
  { label: "Individual Consumer", value: "Individual" },
  { label: "Housing Society (RWA)", value: "Society" },
  { label: "MSME (Micro / Small / Medium)", value: "MSME" },
  { label: "Private Limited / Corporate", value: "Corporate" },
  { label: "Proprietorship / Partnership", value: "Proprietorship" },
  { label: "Government / Educational Body", value: "Government" }
];

export default function SchemePage({ onBack }) {
  const [state, setState] = useState('Select State');
  const [sector, setSector] = useState('DEFAULT_SECTOR');
  const [orgType, setOrgType] = useState('DEFAULT_ORG');

  const [schemes, setSchemes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isFormValid =
    state !== 'Select State' &&
    sector !== 'DEFAULT_SECTOR' &&
    orgType !== 'DEFAULT_ORG';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setError('Please select a valid State, Sector, and Organization Type.');
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch('http://localhost:5000/api/schemes/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ state, sector, orgType })
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();
      setSchemes(data.schemes || []);
    } catch (err) {
      console.error('Error fetching schemes:', err);
      setError('Failed to load eligible schemes. Please ensure your backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scheme-page-container">
      {onBack && (
        <button onClick={onBack} className="scheme-back-btn">
          ← Back to Home
        </button>
      )}

      <div className="scheme-header">
        <h2 className="scheme-page-title">National Solar & Renewable Policy Matcher</h2>
        <p className="scheme-page-subtitle">
          Instantly evaluate eligible Central Subsidies, State Nodal Policies, SERC Net-Metering Tariffs, and Industrial Capital Grants across India.
        </p>
      </div>

      <div className="scheme-filter-card">
        <form onSubmit={handleSubmit} className="scheme-form-grid">
          <div className="scheme-form-field">
            <label>State / Union Territory</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="scheme-form-field">
            <label>Establishment Sector</label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
            >
              {SECTOR_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="scheme-form-field">
            <label>Organization / Entity Type</label>
            <select
              value={orgType}
              onChange={(e) => setOrgType(e.target.value)}
            >
              {ORG_TYPE_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="scheme-submit-btn"
          >
            {loading ? 'Evaluating Mechanisms...' : 'Find Eligible Incentives'}
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className="scheme-results-section">
          <div className="scheme-results-header">
            <h3 className="scheme-results-title">
              Eligible Subsidies & Policy Mechanisms ({schemes.length})
            </h3>
            <span className="scheme-results-badge">
              Targeting: {state} • {sector}
            </span>
          </div>

          {error && (
            <div className="scheme-error-box">
              ⚠️ {error}
            </div>
          )}

          {loading ? (
            <div className="scheme-loading-indicator">
              Searching central database and state nodal rosters...
            </div>
          ) : (
            <SchemeCard
              schemes={schemes}
              onSelectScheme={(scheme) => {
                console.log('Bookmarked scheme:', scheme.scheme_name);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}