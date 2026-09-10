import React, { useState } from 'react';
import './UsageOptimizerPage.css';

const DEFAULT_APPLIANCES = [
  { id: 'ev_charger', name: 'EV Charger (Fast/AC)', powerKw: 7.4, runHours: 3, currentWindow: 'Night (10 PM - 1 AM)', flexible: false },
  { id: 'water_pump', name: 'Water / Irrigation Pump', powerKw: 3.7, runHours: 2, currentWindow: 'Morning (6 AM - 8 AM)', flexible: false },
  { id: 'hvac_ac', name: 'HVAC / Multiple AC Units', powerKw: 4.5, runHours: 6, currentWindow: 'Afternoon (12 PM - 6 PM)', flexible: false },
  { id: 'washer_dryer', name: 'Heavy Wash / Industrial Dryer', powerKw: 2.5, runHours: 2, currentWindow: 'Morning (7 AM - 9 AM)', flexible: false },
  { id: 'cold_storage', name: 'Cold Storage / Deep Freezers', powerKw: 3.0, runHours: 12, currentWindow: 'All Day (Baseline)', flexible: false }
];

export default function UsageOptimizerPage({ onBack }) {
  const [solarCapacityKw, setSolarCapacityKw] = useState('');
  const [gridImportRate, setGridImportRate] = useState('');
  const [solarExportTariff, setSolarExportTariff] = useState('');
  const [appliances, setAppliances] = useState(DEFAULT_APPLIANCES);
  const [optimized, setOptimized] = useState(false);

  const toggleFlexible = (id) => {
    setAppliances((prev) =>
      prev.map((app) => (app.id === id ? { ...app, flexible: !app.flexible } : app))
    );
  };

  const parsedCapacity = parseFloat(solarCapacityKw) || 0;
  const parsedGridRate = parseFloat(gridImportRate) || 0;
  const parsedExportTariff = parseFloat(solarExportTariff) || 0;

  const totalSolarDailyKwh = (parsedCapacity * 4.4).toFixed(1);

  const shiftableEnergyKwh = appliances
    .filter((a) => a.flexible)
    .reduce((acc, curr) => acc + curr.powerKw * curr.runHours, 0);

  const tariffArbitragePerKwh = Math.max(0, parsedGridRate - parsedExportTariff);
  const monthlyDirectSavings = Math.round(shiftableEnergyKwh * tariffArbitragePerKwh * 30);
  const selfConsumptionGainPercent = parsedCapacity > 0
    ? Math.min(100, Math.round((shiftableEnergyKwh / (parseFloat(totalSolarDailyKwh) || 1)) * 100))
    : 0;

  const handleRunOptimizer = (e) => {
    e.preventDefault();
    setOptimized(true);
  };

  return (
    <div className="optimizer-page-container">
      {onBack && (
        <button onClick={onBack} className="optimizer-back-btn">
          ← Back to Home
        </button>
      )}

      <div className="optimizer-header">
        <h2 className="optimizer-page-title">Solar Energy Usage & Load Optimizer</h2>
        <p className="optimizer-page-subtitle">
          Align heavy electrical machinery and appliances with real-time solar generation windows to avoid expensive grid imports and maximize financial return.
        </p>
      </div>

      <div className="optimizer-card">
        <form onSubmit={handleRunOptimizer} className="optimizer-form-grid">
          <div className="optimizer-form-field">
            <label>Rooftop Solar Capacity (kW)</label>
            <input
              type="number"
              min="1"
              step="0.5"
              placeholder="e.g. 10 kW"
              value={solarCapacityKw}
              onChange={(e) => setSolarCapacityKw(e.target.value)}
              required
            />
          </div>

          <div className="optimizer-form-field">
            <label>Grid Peak Tariff Rate (₹ / kWh)</label>
            <input
              type="number"
              min="1"
              step="0.1"
              placeholder="e.g. ₹ 8.50"
              value={gridImportRate}
              onChange={(e) => setGridImportRate(e.target.value)}
              required
            />
          </div>

          <div className="optimizer-form-field">
            <label>DISCOM Solar Export Credit / APPC (₹ / kWh)</label>
            <input
              type="number"
              min="0.5"
              step="0.1"
              placeholder="e.g. ₹ 3.20"
              value={solarExportTariff}
              onChange={(e) => setSolarExportTariff(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="optimizer-submit-btn">
            Calculate Optimal Load Schedule
          </button>
        </form>
      </div>

      <div className="appliances-config-section">
        <h3 className="section-title">Connected Equipment & Heavy Loads</h3>
        <p className="section-desc">
          Click on any equipment to toggle it as a shiftable daytime load (10:00 AM - 3:00 PM).
        </p>

        <div className="appliances-table-wrapper">
          <table className="appliances-table">
            <thead>
              <tr>
                <th>Appliance / Machinery</th>
                <th>Load (kW)</th>
                <th>Daily Run (Hrs)</th>
                <th>Current Run Window</th>
                <th>Flexible Scheduling</th>
              </tr>
            </thead>
            <tbody>
              {appliances.map((app) => (
                <tr key={app.id}>
                  <td className="font-semibold">{app.name}</td>
                  <td>{app.powerKw} kW</td>
                  <td>{app.runHours} hrs</td>
                  <td className="text-muted">{app.currentWindow}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => toggleFlexible(app.id)}
                      className={`toggle-flex-btn ${app.flexible ? 'btn-flexible' : 'btn-fixed'}`}
                    >
                      {app.flexible ? '✓ Shiftable' : '+ Mark Shiftable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {optimized && (
        <div className="optimizer-results-section">
          <div className="optimizer-kpi-grid">
            <div className="optimizer-kpi-card">
              <span className="kpi-label">Est. Daily Generation</span>
              <span className="kpi-value text-accent">{totalSolarDailyKwh} kWh</span>
              <span className="kpi-subtext">Peak generation: 10 AM – 3 PM</span>
            </div>

            <div className="optimizer-kpi-card">
              <span className="kpi-label">Shiftable Solar Consumption</span>
              <span className="kpi-value text-success">+{shiftableEnergyKwh.toFixed(1)} kWh/day</span>
              <span className="kpi-subtext">Shifted from peak grid hours</span>
            </div>

            <div className="optimizer-kpi-card">
              <span className="kpi-label">Projected Bill Savings</span>
              <span className="kpi-value text-warning">₹{monthlyDirectSavings.toLocaleString()}/mo</span>
              <span className="kpi-subtext">Saved via tariff arbitrage</span>
            </div>

            <div className="optimizer-kpi-card">
              <span className="kpi-label">Self-Consumption Gain</span>
              <span className="kpi-value text-primary">+{selfConsumptionGainPercent}%</span>
              <span className="kpi-subtext">Avoided feed-in markdown loss</span>
            </div>
          </div>

          <div className="schedule-recommendations-card">
            <h4 className="card-title">⚡ Recommended Operating Schedule</h4>
            <div className="recommendations-list">
              {appliances.filter((a) => a.flexible).length === 0 ? (
                <p className="no-shifts-text">
                  No loads marked as shiftable. Select one or more items above to view scheduled solar hours and cost savings.
                </p>
              ) : (
                appliances
                  .filter((a) => a.flexible)
                  .map((app, idx) => (
                    <div key={idx} className="rec-item">
                      <div className="rec-badge">Recommended Window</div>
                      <div className="rec-details">
                        <span className="rec-app-name">{app.name}</span>
                        <p className="rec-action-text">
                          Shift from <strong>{app.currentWindow}</strong> to <strong>11:00 AM – 2:00 PM</strong>.
                        </p>
                        <span className="rec-impact">
                          Captures {app.powerKw * app.runHours} kWh of zero-cost direct solar power, saving approximately ₹{Math.round(app.powerKw * app.runHours * tariffArbitragePerKwh * 30)} every month.
                        </span>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}