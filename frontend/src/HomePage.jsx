import './HomePage.css';

function HomePage({ onNavigate }) {
  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>Renewable Energy Advisor</h1>
        <p>MSMEs, industries aur government bodies ke liye — solar/wind feasibility check karo, sahi government scheme dhoondo, aur apna renewable energy adoption plan karo, ek hi jagah.</p>
      </div>

      <div className="section-label">Available Now</div>
      <div className="module-grid">
        <div className="module-card" onClick={() => onNavigate('feasibility')}>
          <h3>Feasibility & ROI Calculator</h3>
          <p>Apni location aur area daalo, solar/wind ka generation, savings, aur payback period turant paao.</p>
          <span className="status-tag ready">Ready</span>
        </div>

        <div className="module-card disabled">
          <h3>Scheme Matcher</h3>
          <p>Apne business ke liye applicable government subsidies aur schemes dhoondo.</p>
          <span className="status-tag soon">Coming Soon</span>
        </div>

        <div className="module-card disabled">
          <h3>Performance Check</h3>
          <p>Already installed system? Actual generation ko expected se compare karo.</p>
          <span className="status-tag soon">Coming Soon</span>
        </div>

        <div className="module-card disabled">
          <h3>Usage Optimizer</h3>
          <p>Apne operating hours ke hisaab se equipment kab chalayein, ye jaano.</p>
          <span className="status-tag soon">Coming Soon</span>
        </div>
      </div>

      <div onClick={() => onNavigate('vendors')} className="vendor-card module-card" >
          <h3>Find Vendors</h3>
          <p>Compare quotes from trusted solar providers across India.</p>
          <span className="status-tag ready">Ready</span>
        </div>

      

      <div className="section-label">Future Roadmap</div>
      <div className="roadmap-list">
        <div className="roadmap-item">
          <span className="name">Battery Storage ROI Calculator</span> — excess generation ko store karke self-use karne ka financial benefit calculate karega.
        </div>
        <div className="roadmap-item">
          <span className="name">Vetted EPC / Vendor Directory</span> — certified local installers ki neutral list, planning se execution tak.
        </div>
        <div className="roadmap-item">
          <span className="name">Bank-Ready Financial DPR</span> — NPV, IRR aur DSCR ke saath bank-loan-ready project report.
        </div>
      </div>
    </div>
  );
}

export default HomePage;