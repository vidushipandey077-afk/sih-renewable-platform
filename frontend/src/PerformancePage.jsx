import React, { useState } from 'react';
import './PerformancePage.css';

export default function PerformancePage({ onBack }) {
  const [capacityKw, setCapacityKw] = useState('');
  const [expectedKwh, setExpectedKwh] = useState('');
  const [actualKwh, setActualKwh] = useState('');
  const [analysisRun, setAnalysisRun] = useState(false);

  const parsedExpected = parseFloat(expectedKwh) || 0;
  const parsedActual = parseFloat(actualKwh) || 0;

  // Performance Ratio Calculation
  const performanceRatio = parsedExpected > 0 ? ((parsedActual / parsedExpected) * 100).toFixed(1) : '0.0';
  const shortfallKwh = parsedExpected > parsedActual ? (parsedExpected - parsedActual).toFixed(1) : '0.0';
  const shortfallPercent = parsedExpected > 0 ? (((parsedExpected - parsedActual) / parsedExpected) * 100).toFixed(1) : '0.0';

  // Diagnostic rule-engine for suggested root causes
  const getUnderperformanceCauses = (pr) => {
    const causes = [];

    if (pr < 90 && pr >= 80) {
      causes.push({
        severity: 'Moderate',
        category: 'Environmental & Soiling',
        title: 'Surface Soiling and Dust Accumulation',
        description: 'Atmospheric particulate matter, bird droppings, or dust reduce solar irradiance penetration across active PV module cells.',
        recommendation: 'Perform clean water washing during early morning or late evening hours to avoid thermal shock.'
      });
      causes.push({
        severity: 'Moderate',
        category: 'Thermal Derating',
        title: 'High Ambient Cell Temperature',
        description: 'Solar panels experience a negative temperature coefficient of power (Pmax ~ -0.35% to -0.40% per °C rise above 25°C).',
        recommendation: 'Ensure adequate clearance (minimum 10-15 cm) between the roof surface and panels for convective airflow.'
      });
    } else if (pr < 80 && pr >= 65) {
      causes.push({
        severity: 'High',
        category: 'Array & Shading',
        title: 'Near Shading and Bypass Diode Activation',
        description: 'New obstructions (trees, parapet walls, water tanks) cause partial string shading, activating bypass diodes and lowering array voltage.',
        recommendation: 'Conduct a shadow analysis using a sun-path chart at 9:00 AM, 12:00 PM, and 3:00 PM; prune foliage or adjust string layout.'
      });
      causes.push({
        severity: 'High',
        category: 'Electrical & Inverter',
        title: 'Inverter MPPT Clipping or Derating',
        description: 'Inverter air vents may be clogged causing thermal throttling, or string voltage may drift outside the optimum MPPT operating window.',
        recommendation: 'Inspect inverter air filters and heat sink fins, and verify DC input voltages per string under peak midday sun.'
      });
      causes.push({
        severity: 'Moderate',
        category: 'Array Degradation',
        title: 'Module Mismatch or PID (Potential Induced Degradation)',
        description: 'Unequal series resistance across strings or leakage currents due to poor grounding can degrade module output prematurely.',
        recommendation: 'Conduct thermal imaging (thermography) with an IR camera to detect localized hotspots or failing bypass diodes.'
      });
    } else if (pr < 65) {
      causes.push({
        severity: 'Critical',
        category: 'System Downtime & String Outage',
        title: 'Blown String Fuse or Tripped DC Isolator',
        description: 'One or more full strings are open-circuited. The system is operating with entire rows of PV panels disconnected.',
        recommendation: 'Measure open-circuit voltage (Voc) and short-circuit current (Isc) across each DC string using a calibrated DC clamp meter.'
      });
      causes.push({
        severity: 'Critical',
        category: 'Grid & Interconnection',
        title: 'DISCOM Grid Overvoltage / Frequency Tripping',
        description: 'High local grid voltage causes the grid-tie inverter to trip offline on anti-islanding protection (overvoltage threshold exceedance).',
        recommendation: 'Review inverter alarm fault logs for codes like "Grid Overvoltage" or "Vac High"; request the DISCOM to adjust transformer taps.'
      });
      causes.push({
        severity: 'Critical',
        category: 'Component Failure',
        title: 'Inverter IGBT / AC Contactor Failure',
        description: 'Hardware failure in the power conversion stage or a stuck AC contactor is preventing complete generation output delivery.',
        recommendation: 'Check error display codes on the inverter front panel and contact the OEM service center for component diagnosis.'
      });
    }

    return causes;
  };

  const causes = getUnderperformanceCauses(parseFloat(performanceRatio));

  const handleAnalyze = (e) => {
    e.preventDefault();
    setAnalysisRun(true);
  };

  return (
    <div className="performance-page-container">
      {onBack && (
        <button onClick={onBack} className="performance-back-btn">
          ← Back to Home
        </button>
      )}

      <div className="performance-header">
        <h2 className="performance-page-title">Solar Generation Diagnostics & Performance Analysis</h2>
        <p className="performance-page-subtitle">
          Compare measured solar production against projected generation to identify technical anomalies and operational losses.
        </p>
      </div>

      <div className="performance-input-card">
        <form onSubmit={handleAnalyze} className="performance-form-grid">
          <div className="performance-form-field">
            <label>Plant Installed Capacity (kW)</label>
            <input
              type="number"
              min="1"
              step="0.5"
              placeholder="e.g. 10 kW"
              value={capacityKw}
              onChange={(e) => setCapacityKw(e.target.value)}
              required
            />
          </div>

          <div className="performance-form-field">
            <label>Target Expected Generation (kWh / Month)</label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 1400 kWh"
              value={expectedKwh}
              onChange={(e) => setExpectedKwh(e.target.value)}
              required
            />
          </div>

          <div className="performance-form-field">
            <label>Actual Inverter Generation (kWh / Month)</label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 1050 kWh"
              value={actualKwh}
              onChange={(e) => setActualKwh(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="performance-submit-btn">
            Run Diagnostics
          </button>
        </form>
      </div>

      {analysisRun && (
        <div className="performance-results-section">
          <div className="performance-kpi-grid">
            <div className="performance-kpi-card">
              <span className="kpi-label">Performance Ratio (PR)</span>
              <span className={`kpi-value ${parseFloat(performanceRatio) < 80 ? 'text-danger' : 'text-success'}`}>
                {performanceRatio}%
              </span>
              <span className="kpi-subtext">Target Benchmark: ≥ 80%</span>
            </div>

            <div className="performance-kpi-card">
              <span className="kpi-label">Energy Generation Loss</span>
              <span className="kpi-value text-warning">
                {shortfallKwh} kWh
              </span>
              <span className="kpi-subtext">Loss Ratio: -{shortfallPercent}%</span>
            </div>

            <div className="performance-kpi-card">
              <span className="kpi-label">Health Status</span>
              <span className={`kpi-value ${parseFloat(performanceRatio) < 75 ? 'text-danger' : parseFloat(performanceRatio) < 85 ? 'text-warning' : 'text-success'}`}>
                {parseFloat(performanceRatio) >= 85 ? 'Optimal' : parseFloat(performanceRatio) >= 75 ? 'Sub-Optimal' : 'Severe Deficit'}
              </span>
              <span className="kpi-subtext">Based on STC irradiance models</span>
            </div>
          </div>

          {parseFloat(performanceRatio) < 90 ? (
            <div className="causes-diagnostic-container">
              <div className="causes-header">
                <h3 className="causes-title">⚠️ Probable Causes of Underperformance</h3>
                <p className="causes-subtitle">
                  The system generated {shortfallPercent}% below expected yield. The following issues are the most likely contributors based on the deficit profile:
                </p>
              </div>

              <div className="causes-list">
                {causes.map((cause, index) => (
                  <div key={index} className={`cause-card cause-severity-${cause.severity.toLowerCase()}`}>
                    <div className="cause-card-top">
                      <span className="cause-category-badge">{cause.category}</span>
                      <span className={`cause-severity-badge severity-${cause.severity.toLowerCase()}`}>
                        {cause.severity} Priority
                      </span>
                    </div>

                    <h4 className="cause-card-title">{cause.title}</h4>
                    <p className="cause-card-desc">{cause.description}</p>

                    <div className="cause-action-box">
                      <span className="action-box-label">Recommended Remediation:</span>
                      <p className="action-box-text">{cause.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="optimal-performance-card">
              <h4>System is Performing Optimally</h4>
              <p>Generation is within standard operating margins. Continue routine scheduled maintenance and periodic cleaning.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}