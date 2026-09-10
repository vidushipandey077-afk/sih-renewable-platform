/**
 * Master Solar Dataset
 * Layer 1: Central Solar Schemes (12)
 * Layer 2: State Solar Policies (36 States & UTs)
 * Layer 3: SERC / DISCOM Solar Metering Frameworks (5)
 * Layer 4: State Industrial Solar Grants (25)
 */

const centralSolarSchemes = [
  {
    scheme_id: "sol_cen_pm_surya_ghar",
    scheme_name: "PM Surya Ghar: Muft Bijli Yojana",
    category: "Central Solar Capital Subsidy (MNRE)",
    target_sector: ["Residential", "Housing Societies (RWA)"],
    organization_type: ["Individual", "Society"],
    applicable_states: ["ALL"],
    eligible_sources: ["Solar Rooftop"],
    subsidy_type: "Direct Benefit Transfer (DBT)",
    subsidy_value_percent: 0.40,
    financial_benefit_description: "₹30,000/kW up to 2 kW; ₹18,000 for the 3rd kW (capped at ₹78,000 for ≥3 kW systems). ₹18,000/kW for common RWA facilities up to 500 kW.",
    min_capacity_kw: 1,
    max_capacity_kw: 500,
    application_url: "https://pmsuryaghar.gov.in",
    required_documents: ["Consumer Electricity Bill", "National Identity Document", "Bank Passbook Copy", "Rooftop Ownership Proof / Tax Receipt"]
  },
  {
    scheme_id: "sol_cen_kusum_a",
    scheme_name: "PM-KUSUM Component A (Decentralized Ground-Mounted Solar)",
    category: "Central Solar Agriculture Policy",
    target_sector: ["Agriculture", "Rural MSME", "Farmer Producer Organizations"],
    organization_type: ["Individual", "Cooperative", "Proprietorship", "Private Limited"],
    applicable_states: ["ALL"],
    eligible_sources: ["Solar Ground-Mounted"],
    subsidy_type: "Guaranteed Feed-in Tariff & 25-Yr PPA",
    subsidy_value_percent: 0.0,
    financial_benefit_description: "25-year Power Purchase Agreement with local DISCOMs at pre-fixed tariffs (approx ₹3.05–₹3.15/kWh) for 500 kW to 2 MW plants on barren or cultivable land.",
    min_capacity_kw: 500,
    max_capacity_kw: 2000,
    application_url: "https://pmkusum.mnre.gov.in",
    required_documents: ["Land Revenue Record (7/12 / Khasra)", "DISCOM Substation Distance Proof", "Grid Feasibility Clearance"]
  },
  {
    scheme_id: "sol_cen_kusum_b",
    scheme_name: "PM-KUSUM Component B (Standalone Solar Agri Pumps)",
    category: "Central Off-Grid Solar Subsidy",
    target_sector: ["Agriculture"],
    organization_type: ["Individual", "Farmer Group"],
    applicable_states: ["ALL"],
    eligible_sources: ["Solar Water Pumps"],
    subsidy_type: "Direct Capital Subsidy",
    subsidy_value_percent: 0.60,
    financial_benefit_description: "60% capital subsidy (30% Central + 30% State share; up to 50% Central in NE/Hilly regions) for solar pumps replacing diesel units up to 7.5 HP.",
    min_capacity_kw: 2,
    max_capacity_kw: 10,
    application_url: "https://pmkusum.mnre.gov.in",
    required_documents: ["Farmer Land Ownership Record", "Water Source Certificate (Borewell/Canal)", "Bank Passbook"]
  },
  {
    scheme_id: "sol_cen_kusum_c_fls",
    scheme_name: "PM-KUSUM Component C (Feeder-Level Solarisation - FLS)",
    category: "Central Agri Feeder Solar Subsidy",
    target_sector: ["Agriculture", "Rural MSME"],
    organization_type: ["Cooperative", "Private Limited", "RESCO Developer"],
    applicable_states: ["ALL"],
    eligible_sources: ["Solar Feeder Plants"],
    subsidy_type: "Capital Grant & Viability Support",
    subsidy_value_percent: 0.60,
    financial_benefit_description: "60% capital subsidy support to solarise agricultural distribution feeders, providing daytime three-phase power for crop irrigation.",
    min_capacity_kw: 100,
    max_capacity_kw: 5000,
    application_url: "https://pmkusum.mnre.gov.in",
    required_documents: ["DISCOM Agri Feeder Audit", "Substation Evacuation NOC", "Land Agreement"]
  },
  {
    scheme_id: "sol_cen_sec32_ad",
    scheme_name: "Accelerated Depreciation for Solar Plants (Sec 32, Income Tax Act)",
    category: "Direct Tax Incentive (CBDT)",
    target_sector: ["Commercial", "Industrial", "MSME", "Corporate"],
    organization_type: ["All Tax-Paying Entities", "Corporate", "MSME"],
    applicable_states: ["ALL"],
    eligible_sources: ["Solar Rooftop", "Solar Ground-Mounted", "Solar Captive"],
    subsidy_type: "Tax Write-Off",
    subsidy_value_percent: 0.40,
    financial_benefit_description: "40% accelerated depreciation on solar PV modules and inverter equipment in the first operating year, reducing corporate income tax liability.",
    min_capacity_kw: 1,
    max_capacity_kw: 100000,
    application_url: "https://incometaxindia.gov.in",
    required_documents: ["Commercial Operation Date (COD) Certificate", "DISCOM Inspection & Commissioning Letter", "Solar Equipment Tax Invoices"]
  },
  {
    scheme_id: "sol_cen_sidbi_4e",
    scheme_name: "SIDBI 4E Solar Scheme (Energy Efficiency & Rooftop for MSMEs)",
    category: "Central Concessional Solar Financing",
    target_sector: ["MSME", "Manufacturing", "Services"],
    organization_type: ["Proprietorship", "LLP", "Private Limited", "Partnership"],
    applicable_states: ["ALL"],
    eligible_sources: ["Solar Rooftop", "Solar Captive"],
    subsidy_type: "Concessional Interest Loan",
    subsidy_value_percent: 0.0,
    financial_benefit_description: "Concessional loans at 7.5% - 8.25% p.a. covering up to 90% of rooftop solar installation costs up to ₹500 Lakhs with 3-year moratorium options.",
    min_capacity_kw: 10,
    max_capacity_kw: 1000,
    application_url: "https://www.sidbi.in/en/products-services/direct-lending/4e-scheme",
    required_documents: ["Udyam Registration Certificate", "Past 2 Years Audited Balance Sheet", "Electricity Bill", "Solar Feasibility DPR"]
  },
  {
    scheme_id: "sol_cen_sidbi_smile",
    scheme_name: "SIDBI SMILE (Soft Loan Fund for Solar Adoption in MSMEs)",
    category: "Central Quasi-Equity & Soft Loans",
    target_sector: ["MSME", "Manufacturing", "Services"],
    organization_type: ["Proprietorship", "LLP", "Private Limited"],
    applicable_states: ["ALL"],
    eligible_sources: ["Solar Rooftop", "Solar Captive"],
    subsidy_type: "Soft Debt / Quasi-Equity",
    subsidy_value_percent: 0.0,
    financial_benefit_description: "Soft loans up to ₹200 Lakhs with lower promoter margin requirements to help micro and small enterprises deploy captive rooftop solar plants.",
    min_capacity_kw: 10,
    max_capacity_kw: 2500,
    application_url: "https://www.sidbi.in/en/products-services/direct-lending/smile",
    required_documents: ["Udyam Registration", "Project Viability Report", "Audited Financial Statements"]
  },
  {
    scheme_id: "sol_cen_solar_pli",
    scheme_name: "PLI Scheme for High-Efficiency Solar PV Modules (Tranche I & II)",
    category: "Central Manufacturing Incentive (MNRE/SECI)",
    target_sector: ["Manufacturing", "Corporate"],
    organization_type: ["Private Limited", "Public Limited"],
    applicable_states: ["ALL"],
    eligible_sources: ["Solar Module Manufacturing"],
    subsidy_type: "Production Linked Incentive (PLI)",
    subsidy_value_percent: 0.0,
    financial_benefit_description: "Direct output incentives paid over 5 years on local sales of high-efficiency silicon cells and modules manufactured in vertically integrated plants.",
    min_capacity_kw: 100000,
    max_capacity_kw: 5000000,
    application_url: "https://seci.co.in",
    required_documents: ["SECI Tender Qualification", "Factory Commercial Operation Proof", "BIS Module Certification"]
  },
  {
    scheme_id: "sol_cen_bess_solar_vgf",
    scheme_name: "Viability Gap Funding for Solar + Battery Storage (BESS)",
    category: "Central Grid Storage Incentive (MoP)",
    target_sector: ["Corporate", "Utility", "Industrial"],
    organization_type: ["Private Limited", "Public Limited", "Government"],
    applicable_states: ["ALL"],
    eligible_sources: ["Solar + Storage Hybrid"],
    subsidy_type: "Viability Gap Capital Grant",
    subsidy_value_percent: 0.40,
    financial_benefit_description: "Up to 40% capital grant viability gap funding for utility-scale solar farms coupled with battery energy storage systems.",
    min_capacity_kw: 2000,
    max_capacity_kw: 100000,
    application_url: "https://powermin.gov.in",
    required_documents: ["Grid Evacuation Feasibility Study", "Detailed Project Report", "Financial Closure Docs"]
  },
  {
    scheme_id: "sol_cen_green_open_access",
    scheme_name: "Solar Green Energy Open Access Framework (MoP)",
    category: "Central Regulatory Mandate",
    target_sector: ["Commercial", "Industrial", "MSME"],
    organization_type: ["All Commercial & Industrial"],
    applicable_states: ["ALL"],
    eligible_sources: ["Solar Open Access", "Solar Captive"],
    subsidy_type: "Regulatory Threshold Concession",
    subsidy_value_percent: 0.0,
    financial_benefit_description: "Lowers open-access capacity ceiling to 100 kW (no limit for captive users), standardizing cross-subsidy surcharges and banking norms.",
    min_capacity_kw: 100,
    max_capacity_kw: 50000,
    application_url: "https://greenopenaccess.in",
    required_documents: ["SLDC/RLDC Registration", "Consumer Sanctioned Load Proof", "Solar PPA Agreement"]
  },
  {
    scheme_id: "sol_cen_pmegp_solar",
    scheme_name: "PMEGP Renewable Technology Grant for Solar Micro-Enterprises",
    category: "Central Capital Subsidy (KVIC)",
    target_sector: ["MSME", "Services", "Agriculture"],
    organization_type: ["Individual", "Proprietorship", "Partnership"],
    applicable_states: ["ALL"],
    eligible_sources: ["Solar Rooftop", "Solar Cold Storage"],
    subsidy_type: "Margin Money Subsidy",
    subsidy_value_percent: 0.35,
    financial_benefit_description: "15% to 35% margin money credit subsidy on bank loans for micro-enterprises deploying off-grid solar equipment.",
    min_capacity_kw: 2,
    max_capacity_kw: 50,
    application_url: "https://www.kviconline.gov.in/pmegpeportal",
    required_documents: ["Project Feasibility DPR", "Educational Qualification Proof", "PAN Card"]
  },
  {
    scheme_id: "sol_cen_customs_gst",
    scheme_name: "Concessional GST & Customs Framework for Solar Modules & Inverters",
    category: "Fiscal Tariff Notification (Ministry of Finance)",
    target_sector: ["Commercial", "Industrial", "MSME", "Residential"],
    organization_type: ["All Entities"],
    applicable_states: ["ALL"],
    eligible_sources: ["Solar Rooftop", "Solar Modules", "Solar Inverters"],
    subsidy_type: "Indirect Tax Concession",
    subsidy_value_percent: 0.12,
    financial_benefit_description: "Statutory 12% concessional GST structure for solar assemblies (70% goods @ 12%, 30% services @ 18%).",
    min_capacity_kw: 1,
    max_capacity_kw: 100000,
    application_url: "https://cbic.gov.in",
    required_documents: ["Project Purchase Contract", "Customs Bill of Entry", "GST Invoices"]
  }
];

const stateSolarPolicies = {
  "Uttar Pradesh": {
    sna: "UPNEDA",
    policyName: "Uttar Pradesh Solar Energy Policy",
    dutyExemptionYears: 10,
    wheelingDiscount: "50% transmission & wheeling fee waiver for captive solar",
    stateTopup: "State top-up subsidy of ₹15,000/kW (capped at ₹30,000) over central PM Surya Ghar grants.",
    solarBanking: "Annual solar banking allowed with nominal charges.",
    url: "https://solar.upneda.in"
  },
  "Delhi": {
    sna: "IPGCL / DSERC",
    policyName: "Delhi Solar Energy Policy",
    dutyExemptionYears: 5,
    wheelingDiscount: "100% duty waiver and streamlined Virtual Net-Metering (VNM)",
    gbi: "Generation-Based Incentive (GBI) of ₹3/kWh for residential and ₹2/kWh for C&I for 5 years.",
    solarBanking: "Monthly net-metering settlement rollover.",
    url: "https://solar.delhi.gov.in"
  },
  "Rajasthan": {
    sna: "RRECL",
    policyName: "Rajasthan Solar Energy Policy",
    dutyExemptionYears: 7,
    wheelingDiscount: "50% concessional transmission charges for captive setups",
    stateTopup: "State solar pump top-up subsidy under Raj-KUSUM.",
    solarBanking: "Annual banking settlement with DISCOMs.",
    url: "https://energy.rajasthan.gov.in/rrecl"
  },
  "Gujarat": {
    sna: "GEDA",
    policyName: "Gujarat Renewable Energy Policy (Solar)",
    dutyExemptionYears: 5,
    wheelingDiscount: "100% Cross-Subsidy Surcharge waiver for captive solar",
    solarBanking: "Monthly energy banking settlement against HT/LT consumption.",
    url: "https://geda.gujarat.gov.in"
  },
  "Maharashtra": {
    sna: "MEDA",
    policyName: "Maharashtra State Solar Energy Policy",
    dutyExemptionYears: 5,
    wheelingDiscount: "Concessional transmission wheeling under MERC",
    stateTopup: "15% capital grant on solar installations for micro and small units under PSI.",
    solarBanking: "Monthly netting under MSEDCL / Tata Power / Adani.",
    url: "https://mahaurja.com"
  },
  "Karnataka": {
    sna: "KREDL",
    policyName: "Karnataka Renewable Energy Policy (Solar)",
    dutyExemptionYears: 5,
    wheelingDiscount: "50% transmission and wheeling fee concession",
    openAccessCap: "Open-access threshold lowered to 100 kW under BESCOM/MESCOM.",
    solarBanking: "Six-month banking cycle with net-feed-in settlements.",
    url: "https://kredlinfo.in"
  },
  "Tamil Nadu": {
    sna: "TEDA",
    policyName: "Tamil Nadu Solar Energy Policy",
    dutyExemptionYears: 2,
    wheelingDiscount: "Guaranteed export feed-in tariff for commercial consumers",
    tariffStructure: "Network charges applied with net feed-in credit accounting under TANGEDCO.",
    url: "https://teda.in"
  },
  "Telangana": {
    sna: "TSREDCO",
    policyName: "Telangana Solar Power Policy",
    dutyExemptionYears: 5,
    wheelingDiscount: "100% electricity duty waiver in industrial estates",
    portal: "Single-window approvals via TS-iPASS.",
    url: "https://tsredco.telangana.gov.in"
  },
  "Haryana": {
    sna: "HAREDA",
    policyName: "Haryana Solar Energy Policy",
    dutyExemptionYears: 5,
    wheelingDiscount: "Zero duty and cross-subsidy surcharge on rooftop solar",
    mandate: "Mandatory solar on urban plots ≥ 500 sq yards.",
    url: "https://hareda.gov.in"
  },
  "Punjab": {
    sna: "PEDA",
    policyName: "Punjab State Solar Rooftop Policy",
    dutyExemptionYears: 5,
    wheelingDiscount: "100% waiver of duty and cross-subsidy surcharges up to 10 MW",
    solarBanking: "Quarterly banking rollover with PSPCL.",
    url: "https://peda.gov.in"
  },
  "Kerala": {
    sna: "ANERT",
    policyName: "Kerala Soura Solar Rooftop Scheme",
    dutyExemptionYears: 3,
    wheelingDiscount: "KSEBL rooftop net-metering framework",
    stateTopup: "Co-funded installation support and zero meter rental charges.",
    url: "https://anert.gov.in"
  },
  "Andhra Pradesh": {
    sna: "NREDCAP",
    policyName: "Andhra Pradesh Solar Power Policy",
    dutyExemptionYears: 10,
    wheelingDiscount: "50% discount on transmission charges for open-access solar",
    solarBanking: "Annual banking credit system with APCPDCL/APEPDCL.",
    url: "https://nredcap.gov.in"
  },
  "Madhya Pradesh": {
    sna: "MPUVNL",
    policyName: "Madhya Pradesh Solar Energy Policy",
    dutyExemptionYears: 10,
    wheelingDiscount: "50% stamp duty waiver on land for captive solar plants",
    solarBanking: "100% exemption from duty and energy cess for 10 years.",
    url: "https://mprenewable.nic.in"
  },
  "West Bengal": {
    sna: "WBREDA",
    policyName: "West Bengal Solar Policy & Institutional Net-Metering",
    dutyExemptionYears: 5,
    wheelingDiscount: "Zero banking charges for universities and educational campuses",
    solarBanking: "Net-metering for systems up to 5 kW under WBSEDCL and CESC.",
    url: "https://wbreda.wb.gov.in"
  },
  "Odisha": {
    sna: "OREDA",
    policyName: "Odisha Renewable Energy Policy (Solar)",
    dutyExemptionYears: 15,
    wheelingDiscount: "₹0.50/kWh duty concession for 15 years on captive solar",
    solarBanking: "Zero cross-subsidy surcharge on open-access solar.",
    url: "https://oredaorissa.com"
  },
  "Chhattisgarh": {
    sna: "CREDA",
    policyName: "Chhattisgarh Clean Energy Policy (Solar)",
    dutyExemptionYears: 7,
    wheelingDiscount: "7-year duty exemption for heavy manufacturing units adopting solar",
    url: "https://creda.cgstate.gov.in"
  },
  "Jharkhand": {
    sna: "JREDA",
    policyName: "Jharkhand Solar Energy Policy",
    dutyExemptionYears: 5,
    wheelingDiscount: "50% transmission and wheeling concession for industrial estates",
    url: "https://jreda.com"
  },
  "Bihar": {
    sna: "BREDA",
    policyName: "Bihar Policy for Promotion of Solar Energy",
    dutyExemptionYears: 5,
    wheelingDiscount: "20% capital subsidy on solar cold storages and rural agro-microgrids",
    url: "https://breda.bihar.gov.in"
  },
  "Uttarakhand": {
    sna: "UREDA",
    policyName: "Uttarakhand Solar Energy Policy",
    dutyExemptionYears: 5,
    wheelingDiscount: "20% capital subsidy for solar rooftop plants on mountain homestays and hotels",
    url: "https://ureda.uk.gov.in"
  },
  "Himachal Pradesh": {
    sna: "HIMURJA",
    policyName: "Himachal Pradesh Solar Policy",
    dutyExemptionYears: 5,
    wheelingDiscount: "State top-up subsidy of ₹4,000/kW over central grants for hilly areas",
    url: "https://himurja.hp.gov.in"
  },
  "Assam": {
    sna: "APDCL",
    policyName: "Assam Solar Energy Policy",
    dutyExemptionYears: 5,
    wheelingDiscount: "Fast-track solar clearances for tea garden estates",
    url: "https://www.apdcl.org"
  },
  "Goa": {
    sna: "Goa Energy Development Agency",
    policyName: "Goa Solar Energy Policy",
    dutyExemptionYears: 3,
    wheelingDiscount: "20% pro-rata capital subsidy for hotels and domestic villas",
    url: "https://geda.goa.gov.in"
  },
  "Jammu & Kashmir": {
    sna: "JAKEDA",
    policyName: "Jammu & Kashmir Rooftop Solar Incentive",
    dutyExemptionYears: 5,
    wheelingDiscount: "25% state top-up subsidy over central benchmark costs",
    url: "https://jakeda.jk.gov.in"
  },
  "Ladakh": {
    sna: "LREDA",
    policyName: "Ladakh Solar & Battery Energy Storage Policy",
    dutyExemptionYears: 5,
    wheelingDiscount: "Support for high-altitude battery-backed solar microgrids",
    url: "https://ladakh.nic.in"
  },
  "Sikkim": {
    sna: "SREDA",
    policyName: "Sikkim Solar Rooftop Incentive",
    dutyExemptionYears: 5,
    wheelingDiscount: "Mountain climate micro-generation incentives",
    url: "https://sreda.gov.in"
  },
  "Meghalaya": {
    sna: "MNREDA",
    policyName: "Meghalaya Solar Policy",
    dutyExemptionYears: 5,
    wheelingDiscount: "Off-grid decentralized solar incentives for remote clusters",
    url: "https://mnreda.gov.in"
  },
  "Tripura": {
    sna: "TREDA",
    policyName: "Tripura Solar Energy Incentive",
    dutyExemptionYears: 5,
    wheelingDiscount: "Clean energy subsidies for solar in rubber processing factories",
    url: "https://treda.nic.in"
  },
  "Mizoram": {
    sna: "ZEDA",
    policyName: "Mizoram Solar Policy",
    dutyExemptionYears: 5,
    wheelingDiscount: "Capital grants for solarization of agro-forest processing hubs",
    url: "https://zeda.mizoram.gov.in"
  },
  "Nagaland": {
    sna: "NEDA",
    policyName: "Nagaland Solar Incentive",
    dutyExemptionYears: 5,
    wheelingDiscount: "Village council rooftop solar partnerships",
    url: "https://neda.nagaland.gov.in"
  },
  "Manipur": {
    sna: "MANIREDA",
    policyName: "Manipur Renewable Energy Policy",
    dutyExemptionYears: 5,
    wheelingDiscount: "Decentralized mini-grid subsidies for remote hill areas",
    url: "https://manireda.mn.gov.in"
  },
  "Arunachal Pradesh": {
    sna: "APEDA",
    policyName: "Arunachal Pradesh Border Solarisation Scheme",
    dutyExemptionYears: 5,
    wheelingDiscount: "100% government assistance for decentralized border solar",
    url: "https://apeda.nic.in"
  },
  "Chandigarh": {
    sna: "CREST",
    policyName: "Chandigarh Rooftop Solar Mandate",
    dutyExemptionYears: 5,
    wheelingDiscount: "Mandatory solar adoption with zero-investment RESCO rooftop options",
    url: "https://crest.chd.gov.in"
  },
  "Puducherry": {
    sna: "Renewable Energy Agency of Puducherry",
    policyName: "Puducherry Solar Rooftop Incentive",
    dutyExemptionYears: 3,
    wheelingDiscount: "Net-metering duty waiver for coastal agro-processing and tourism",
    url: "https://reap.py.gov.in"
  },
  "Andaman & Nicobar": {
    sna: "A&N Power Department",
    policyName: "Andaman & Nicobar Island Solar Policy",
    dutyExemptionYears: 5,
    wheelingDiscount: "Diesel-displacement feed-in tariff bonuses for hotels",
    url: "https://andaman.gov.in"
  },
  "Dadra & Nagar Haveli and Daman & Diu": {
    sna: "DNH-DD Power Department",
    policyName: "DNH-DD Industrial Solar Incentive",
    dutyExemptionYears: 5,
    wheelingDiscount: "Accelerated net-metering and duty exemptions for manufacturing",
    url: "https://dnh.gov.in"
  },
  "Lakshadweep": {
    sna: "Lakshadweep Energy Department",
    policyName: "Lakshadweep Green Coral Solar Programme",
    dutyExemptionYears: 5,
    wheelingDiscount: "Subsidized rooftop and floating solar projects to replace diesel",
    url: "https://lakshadweep.gov.in"
  }
};

const sercSolarTariffModels = {
  "Solar-Net-Metering": {
    name: "SERC Traditional Solar Net-Metering",
    mechanism: "Bi-directional metering where exported solar kWh units directly offset imported grid units at full retail consumer tariffs on a monthly basis.",
    applicableTo: ["Residential", "Housing Societies (RWA)", "MSME", "Institutional"]
  },
  "Solar-Net-Billing": {
    name: "SERC Solar Net-Billing / Net Feed-in",
    mechanism: "All imported energy is billed at commercial rates; surplus exported solar is purchased by DISCOMs at APPC (₹2.10–₹3.65/kWh).",
    applicableTo: ["Commercial", "Industrial"]
  },
  "Solar-Virtual-Net-Metering": {
    name: "SERC Virtual Net-Metering (VNM)",
    mechanism: "A centralized solar rooftop array feeds electricity into the grid; credits are allocated across individual flat owners or tenants proportionally.",
    applicableTo: ["Residential", "Housing Societies (RWA)", "Government", "Institutional"]
  },
  "Solar-Group-Net-Metering": {
    name: "SERC Group Net-Metering (GNM)",
    mechanism: "Surplus solar energy from one facility is credited across electricity bills of other buildings/offices owned by the same legal entity.",
    applicableTo: ["Commercial", "Industrial", "Government"]
  },
  "Solar-Gross-Metering": {
    name: "SERC Utility Solar Gross-Metering",
    mechanism: "100% of solar generation is exported directly into the grid under a long-term PPA with the DISCOM without on-site load offsetting.",
    applicableTo: ["Industrial", "Corporate", "Utility"]
  }
};

const stateIndustrialSolarGrants = [
  { state: "Maharashtra", name: "Package Scheme of Incentives (PSI)", benefit: "15% to 25% capital subsidy on captive rooftop solar arrays for MSMEs in Vidarbha, Marathwada, and North Maharashtra." },
  { state: "Gujarat", name: "Green Manufacturing Subsidy (Industrial Policy)", benefit: "Up to 50% subsidy (capped at ₹50 Lakhs) for industrial energy audits and captive rooftop solar installations." },
  { state: "Uttar Pradesh", name: "Industrial Investment & Employment Promotion Policy", benefit: "5% interest subsidy on bank term loans procured for industrial captive solar power installations." },
  { state: "Tamil Nadu", name: "MSME Green Category Capital Subsidy", benefit: "25% capital subsidy (up to ₹30 Lakhs) for MSMEs establishing captive solar installations." },
  { state: "Rajasthan", name: "Rajasthan Investment Promotion Scheme (RIPS)", benefit: "75% SGST reimbursement and 100% electricity duty exemption for green manufacturing units with solar setups." },
  { state: "Karnataka", name: "Industrial Clean Production Subsidy", benefit: "Financial assistance up to ₹10 Lakhs for zero-discharge and rooftop solar integration in industrial estates." },
  { state: "Telangana", name: "T-IDEA / T-PRIDE Solar Incentives", benefit: "15% to 35% capital investment subsidy for SC/ST/Women entrepreneurs installing captive rooftop solar." },
  { state: "Haryana", name: "Enterprise & Employment Promotion Policy", benefit: "Concessional green debt and up to ₹10 Lakhs direct grant for zero-carbon factory upgrades." },
  { state: "Punjab", name: "Industrial Development Clean Energy Policy", benefit: "Stamp duty exemption and power tariff concessions for export factories running on captive solar." },
  { state: "West Bengal", name: "Industrial Promotion Clean Tech Subsidy", benefit: "20% capital support for solar PV equipment used in industrial effluent and water treatment plants." },
  { state: "Odisha", name: "Industrial Policy Resolution (IPR) Solar Grant", benefit: "Subsidized land allocation and capital subsidies up to ₹1 Crore for green manufacturing units adopting solar." },
  { state: "Madhya Pradesh", name: "Industrial Promotion Policy Solar Incentive", benefit: "Quality certification reimbursements and green tariff rebates for textile and food parks running on solar." },
  { state: "Kerala", name: "Industrial Green Rating Incentive", benefit: "Up to ₹5 Lakhs cash grant for MSMEs installing solar setups to achieve ISO 50001 energy compliance." },
  { state: "Andhra Pradesh", name: "Industrial Clean Infrastructure Subsidy", benefit: "Capital subsidies for solar-powered cold chains and processing facilities in coastal aquaculture belts." },
  { state: "Assam", name: "Tea Factory Solar Transition Grant", benefit: "30% capital grant for tea manufacturing plants switching drying and auxiliary loads to solar PV." },
  { state: "Chhattisgarh", name: "Industrial Policy Solar Park Concession", benefit: "50% land conversion discounts for captive solar setups built by manufacturing plants." },
  { state: "Jharkhand", name: "Industrial Clean Energy Incentive", benefit: "20% capital subsidy for rooftop solar arrays installed in tribal small-business industrial areas." },
  { state: "Himachal Pradesh", name: "Border Industrial Area Freight Rebate", benefit: "Transport freight subsidies for solar modules and inverter equipment shipped to border industrial clusters." },
  { state: "Uttarakhand", name: "Mega Project Renewable Concession Package", benefit: "10-year SGST rebates for manufacturing plants meeting 50%+ of power demands through captive solar." },
  { state: "Bihar", name: "Agro-Industrial Solarization Scheme", benefit: "Up to 25% subsidy for solarizing food grain milling, hulling, and rural cold-storage units." },
  { state: "Goa", name: "Eco-Tourism Solar Subsidy", benefit: "Capital rebates for hotels and beach resorts installing certified solar water heating and rooftop PV arrays." },
  { state: "Delhi", name: "Green Factory Modernization Grant", benefit: "100% reimbursement of technical DPR preparation and structural roof testing costs for factory solar." },
  { state: "Jammu & Kashmir", name: "Agro-Industrial Cold Chain Solar Grant", benefit: "30% capital grant for solarizing apple and walnut controlled-atmosphere cold stores." },
  { state: "Chandigarh", name: "Industrial Area Zero-Carbon Rebate", benefit: "Municipal property tax discounts for manufacturing facilities deriving >30% power from solar." },
  { state: "Puducherry", name: "Coastal MSME Solar Subsidy", benefit: "15% capital grant on solar installations for seafood and marine-processing units." }
];

module.exports = {
  centralSolarSchemes,
  stateSolarPolicies,
  sercSolarTariffModels,
  stateIndustrialSolarGrants
};