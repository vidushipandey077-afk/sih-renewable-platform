const {
  centralSolarSchemes,
  stateSolarPolicies,
  sercSolarTariffModels,
  stateIndustrialSolarGrants
} = require('../data/nationalIncentivesData');

function matchSchemes({ orgType, sector, state }) {
  const reqOrg = (orgType || '').trim().toLowerCase();
  const reqSec = (sector || '').trim().toLowerCase();
  const reqSt = (state || 'Uttar Pradesh').trim();

  const results = [];

  // 1. Central Solar Schemes - Strict Matching
  centralSolarSchemes.forEach((scheme) => {
    // Check State
    const stateMatches = scheme.applicable_states.some(
      (st) => st.toLowerCase() === 'all' || st.toLowerCase() === reqSt.toLowerCase()
    );
    if (!stateMatches) return;

    const schemeSectors = scheme.target_sector.map((s) => s.toLowerCase());
    const schemeOrgs = scheme.organization_type.map((o) => o.toLowerCase());

    // Sector Filter Rule
    let sectorMatches = false;
    if (schemeSectors.includes('all')) {
      sectorMatches = true;
    } else if (reqSec === 'commercial') {
      sectorMatches = schemeSectors.includes('commercial') || schemeSectors.includes('corporate');
    } else if (reqSec === 'manufacturing') {
      sectorMatches = schemeSectors.includes('manufacturing') || schemeSectors.includes('industrial');
    } else if (reqSec === 'services') {
      sectorMatches = schemeSectors.includes('services') || schemeSectors.includes('commercial');
    } else if (reqSec === 'residential') {
      sectorMatches = schemeSectors.includes('residential') || schemeSectors.includes('housing societies (rwa)');
    } else if (reqSec === 'agriculture') {
      sectorMatches = schemeSectors.some((s) => s.includes('agri') || s.includes('farmer'));
    } else if (reqSec === 'institutional') {
      sectorMatches = schemeSectors.includes('institutional');
    }

    if (!sectorMatches) return;

    // Organization Type Rule
    let orgMatches = false;
    if (schemeOrgs.includes('all') || schemeOrgs.includes('all entities') || schemeOrgs.includes('all commercial & industrial') || schemeOrgs.includes('all tax-paying entities')) {
      orgMatches = true;
    } else if (reqOrg === 'individual') {
      orgMatches = schemeOrgs.includes('individual');
    } else if (reqOrg === 'society') {
      orgMatches = schemeOrgs.includes('society') || schemeOrgs.includes('rwa');
    } else if (reqOrg === 'msme') {
      orgMatches = schemeOrgs.includes('msme') || schemeOrgs.includes('proprietorship') || schemeOrgs.includes('llp') || schemeOrgs.includes('partnership');
    } else if (reqOrg === 'corporate') {
      orgMatches = schemeOrgs.includes('corporate') || schemeOrgs.includes('private limited') || schemeOrgs.includes('public limited');
    } else if (reqOrg === 'proprietorship') {
      orgMatches = schemeOrgs.includes('proprietorship') || schemeOrgs.includes('individual') || schemeOrgs.includes('msme');
    } else if (reqOrg === 'government') {
      orgMatches = schemeOrgs.includes('government') || schemeOrgs.includes('institutional');
    }

    if (!orgMatches) return;

    results.push({
      ...scheme,
      layer: 'Central Solar Scheme'
    });
  });

  // 2. State Solar Policies (Nodal Agency)
  const stateProfile = stateSolarPolicies[reqSt];
  if (stateProfile) {
    results.push({
      scheme_id: `sol_state_${reqSt.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      scheme_name: `${reqSt} - ${stateProfile.policyName} (${stateProfile.sna})`,
      category: 'State Statutory Solar Policy',
      target_sector: [sector],
      organization_type: [orgType],
      applicable_states: [reqSt],
      eligible_sources: ['Solar Rooftop', 'Solar Ground-Mounted'],
      subsidy_type: 'State Duty Waiver & Grid Concession',
      subsidy_value_percent: 0.15,
      financial_benefit_description: `${stateProfile.dutyExemptionYears}-year 100% Electricity Duty Exemption; ${stateProfile.wheelingDiscount}. ${stateProfile.stateTopup || stateProfile.gbi || stateProfile.solarBanking || ''}`,
      min_capacity_kw: 1,
      max_capacity_kw: 10000,
      application_url: stateProfile.url,
      required_documents: [`${stateProfile.sna} Portal Registration`, 'DISCOM Net-Metering Sanction', 'Building Roof Structural Fitness'],
      layer: 'State Solar Policy'
    });
  }

  // 3. DISCOM / SERC Regulatory Tariffs
  const isResidential = reqSec === 'residential';
  const isCommercialOrIndustrial = ['commercial', 'manufacturing', 'services'].includes(reqSec);

  if (isResidential) {
    results.push({
      scheme_id: `sol_discom_net_metering_${reqSt.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      scheme_name: `${reqSt} SERC Residential Solar Net-Metering Rules`,
      category: 'DISCOM Solar Tariff Framework',
      target_sector: ['Residential'],
      organization_type: [orgType],
      applicable_states: [reqSt],
      eligible_sources: ['Solar Rooftop'],
      subsidy_type: '1:1 Retail Solar Netting',
      subsidy_value_percent: 0.0,
      financial_benefit_description: sercSolarTariffModels['Solar-Net-Metering'].mechanism,
      min_capacity_kw: 1,
      max_capacity_kw: 500,
      application_url: stateProfile ? stateProfile.url : 'https://pmsuryaghar.gov.in',
      required_documents: ['Consumer Electricity Bill', 'Bi-directional Meter Sanction', 'DISCOM Inspection Report'],
      layer: 'DISCOM Solar Tariff'
    });

    if (reqOrg === 'society') {
      results.push({
        scheme_id: `sol_discom_vnm_${reqSt.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
        scheme_name: `${reqSt} Virtual Net-Metering (VNM) for Multi-Tenant Societies`,
        category: 'DISCOM Solar Framework',
        target_sector: ['Residential'],
        organization_type: ['Society'],
        applicable_states: [reqSt],
        eligible_sources: ['Solar Rooftop'],
        subsidy_type: 'Partitioned Solar Credit',
        subsidy_value_percent: 0.0,
        financial_benefit_description: sercSolarTariffModels['Solar-Virtual-Net-Metering'].mechanism,
        min_capacity_kw: 10,
        max_capacity_kw: 1000,
        application_url: stateProfile ? stateProfile.url : 'https://pmsuryaghar.gov.in',
        required_documents: ['RWA Executive Resolution', 'Member Electricity Consumer List', 'DISCOM NOC'],
        layer: 'DISCOM Solar Tariff'
      });
    }
  }

  if (isCommercialOrIndustrial) {
    results.push({
      scheme_id: `sol_discom_net_billing_${reqSt.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      scheme_name: `${reqSt} SERC Commercial & Industrial Solar Net-Billing`,
      category: 'DISCOM C&I Solar Tariff',
      target_sector: [sector],
      organization_type: [orgType],
      applicable_states: [reqSt],
      eligible_sources: ['Solar Rooftop', 'Solar Captive'],
      subsidy_type: 'APPC Solar Feed-in Credit',
      subsidy_value_percent: 0.0,
      financial_benefit_description: sercSolarTariffModels['Solar-Net-Billing'].mechanism,
      min_capacity_kw: 10,
      max_capacity_kw: 5000,
      application_url: stateProfile ? stateProfile.url : 'https://powermin.gov.in',
      required_documents: ['Commercial Tariff Sanction Letter', 'HT/LT Transformer NOC', 'CEIG Safety Certificate'],
      layer: 'DISCOM Solar Tariff'
    });

    results.push({
      scheme_id: `sol_discom_gnm_${reqSt.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      scheme_name: `${reqSt} SERC Group Net-Metering (Multi-Site Wheeling)`,
      category: 'DISCOM C&I Solar Tariff',
      target_sector: [sector],
      organization_type: [orgType],
      applicable_states: [reqSt],
      eligible_sources: ['Solar Rooftop', 'Solar Ground-Mounted'],
      subsidy_type: 'Multi-Office Solar Offsetting',
      subsidy_value_percent: 0.0,
      financial_benefit_description: sercSolarTariffModels['Solar-Group-Net-Metering'].mechanism,
      min_capacity_kw: 50,
      max_capacity_kw: 10000,
      application_url: stateProfile ? stateProfile.url : 'https://powermin.gov.in',
      required_documents: ['Electricity Account Schedule', 'Entity PAN/CIN Verification', 'DISCOM Approval Letter'],
      layer: 'DISCOM Solar Tariff'
    });
  }

  // 4. State Industrial Solar Grants (Strictly Manufacturing Only)
  if (reqSec === 'manufacturing') {
    const industrialSolarGrants = stateIndustrialSolarGrants.filter(
      (item) => item.state.toLowerCase() === reqSt.toLowerCase()
    );

    industrialSolarGrants.forEach((indGrant, idx) => {
      results.push({
        scheme_id: `sol_ind_${reqSt.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${idx}`,
        scheme_name: `${reqSt} ${indGrant.name}`,
        category: 'State Industrial Clean Energy Subsidy',
        target_sector: [sector],
        organization_type: [orgType],
        applicable_states: [reqSt],
        eligible_sources: ['Solar Rooftop', 'Solar Captive'],
        subsidy_type: 'Direct Capital Reimbursement',
        subsidy_value_percent: 0.20,
        financial_benefit_description: indGrant.benefit,
        min_capacity_kw: 10,
        max_capacity_kw: 5000,
        application_url: stateProfile ? stateProfile.url : 'https://msme.gov.in',
        required_documents: ['Udyam Registration', 'Factory Inspector License', 'CA Solar Asset Certificate'],
        layer: 'Industrial Solar Subsidy'
      });
    });
  }

  return results.sort((a, b) => (b.subsidy_value_percent || 0) - (a.subsidy_value_percent || 0));
}

module.exports = { matchSchemes };