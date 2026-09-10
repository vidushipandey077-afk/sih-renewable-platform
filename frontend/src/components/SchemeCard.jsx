import React from 'react';

export default function SchemeCard({ schemes = [], onSelectScheme }) {
  if (!schemes || schemes.length === 0) {
    return (
      <div className="scheme-empty-state">
        No eligible solar schemes or subsidies found matching these parameters. Try adjusting your state, sector, or entity type.
      </div>
    );
  }

  const getLayerBadgeClass = (layer) => {
    switch (layer) {
      case 'Central Solar Scheme':
        return 'badge-central';
      case 'State Solar Policy':
        return 'badge-state';
      case 'DISCOM Solar Tariff':
        return 'badge-discom';
      case 'Industrial Solar Subsidy':
        return 'badge-industrial';
      default:
        return 'badge-central';
    }
  };

  return (
    <div className="scheme-cards-container">
      {schemes.map((scheme, index) => {
        const hasPercent = scheme.subsidy_value_percent && scheme.subsidy_value_percent > 0;

        return (
          <div key={scheme.scheme_id || index} className="scheme-card">
            <div className="scheme-card-badge-row">
              {index === 0 && hasPercent && (
                <span className="scheme-badge badge-recommended">
                  ⭐ Top Solar Subsidy ({Math.round(scheme.subsidy_value_percent * 100)}%)
                </span>
              )}

              {scheme.layer && (
                <span className={`scheme-badge ${getLayerBadgeClass(scheme.layer)}`}>
                  {scheme.layer}
                </span>
              )}

              <span className="scheme-badge badge-type">
                {scheme.subsidy_type}
              </span>
            </div>

            <h4 className="scheme-card-title">{scheme.scheme_name}</h4>
            <p className="scheme-card-category">{scheme.category}</p>

            <div className="scheme-info-box">
              <span className="info-box-label">Solar Financial Benefit:</span>
              <p className="info-box-desc">{scheme.financial_benefit_description}</p>
            </div>

            <div className="scheme-meta-grid">
              <div className="meta-item">
                <span className="meta-label">Applicable Solar Tech:</span>
                <span className="meta-value">{scheme.eligible_sources.join(', ')}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Capacity Range:</span>
                <span className="meta-value">
                  {scheme.min_capacity_kw} kW – {scheme.max_capacity_kw.toLocaleString()} kW
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Target Sector:</span>
                <span className="meta-value">{scheme.target_sector.join(', ')}</span>
              </div>
            </div>

            {scheme.required_documents && scheme.required_documents.length > 0 && (
              <div className="scheme-docs-container">
                <span className="docs-heading">Required Documents for Solar Approval:</span>
                <div className="docs-chip-group">
                  {scheme.required_documents.map((doc, docIndex) => (
                    <span key={docIndex} className="doc-chip">
                      ✓ {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="scheme-card-actions">
              {onSelectScheme && (
                <button
                  type="button"
                  className="scheme-select-btn"
                  onClick={() => onSelectScheme(scheme)}
                >
                  Bookmark
                </button>
              )}
              <a
                href={scheme.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="scheme-apply-btn"
              >
                Apply via Official Solar Portal →
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}