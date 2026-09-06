import { useState } from 'react';
import './FeasibilityPage.css';

function FeasibilityPage() {
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [tariff, setTariff] = useState('');
  const [operatingStart, setOperatingStart] = useState('09:00');
  const [operatingEnd, setOperatingEnd] = useState('18:00');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/feasibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          area: parseFloat(area),
          tariff: parseFloat(tariff),
          operatingStart,
          operatingEnd
        })
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.result);
      } else {
        alert(data.message || "Kuch galat ho gaya, dobara try karo.");
      }
    } catch (error) {
      alert("Server se connect nahi ho paya. Check karo backend chal raha hai ya nahi.");
    }

    setLoading(false);
  }

  return (
    <div className="feasibility-page">
      <h2>Feasibility Calculator</h2>
      <p className="subtitle">Apni location aur business details daalein, hum aapke liye solar/wind ka analysis karenge.</p>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Location (Shehar/Address)</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="jaise Jaipur, Rajasthan" required />
          </div>

          <div className="field">
            <label>Roof / Land Area (m²)</label>
            <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="500" required />
          </div>

          <div className="field">
            <label>Electricity Tariff (₹/unit)</label>
            <input value={tariff} onChange={(e) => setTariff(e.target.value)} placeholder="9" required />
          </div>

          <div className="field-row">
            <div className="field">
              <label>Operating Start</label>
              <input type="time" value={operatingStart} onChange={(e) => setOperatingStart(e.target.value)} />
            </div>
            <div className="field">
              <label>Operating End</label>
              <input type="time" value={operatingEnd} onChange={(e) => setOperatingEnd(e.target.value)} />
            </div>
          </div>

          <button className="calculate-btn" type="submit" disabled={loading}>
            {loading ? "Calculating..." : "Calculate Feasibility"}
          </button>
        </form>
      </div>

      {result && (
        <div className="result-panel">
          <div className="result-hero">
            <div className="hero-number">{result.paybackPeriod.toFixed(1)} yrs</div>
            <div className="hero-label">Estimated Payback Period</div>
            <span className="recommended-badge">Recommended: {result.recommendedType}</span>
          </div>
          <div className="result-details">
            <div className="result-row">
              <span className="label">System Capacity</span>
              <span className="value">{result.capacity} kW</span>
            </div>
            <div className="result-row">
              <span className="label">Annual Generation</span>
              <span className="value">{result.annualGeneration.toFixed(0)} kWh</span>
            </div>
            <div className="result-row">
              <span className="label">Annual Savings</span>
              <span className="value">₹{result.annualSavings.toFixed(0)}</span>
            </div>
            <div className="result-row">
              <span className="label">Total Cost</span>
              <span className="value">₹{result.totalCost.toFixed(0)}</span>
            </div>
            <div className="result-row">
              <span className="label">20-Year NPV</span>
              <span className="value">₹{result.npv.toFixed(0)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeasibilityPage;