// Constants (fixed values)
const performanceRatio = 0.77;        
const windCapacityFactor = 0.22;
const costPerKw = 50000;
const discountRate = 0.08;
const systemLifetime = 20;

function calculateFeasibility(area, irradiance, windSpeed, tariff, operatingStart, operatingEnd) {
  
  // Step 1: System Capacity
  const capacity = area / 10;

  // Step 2: Annual Solar Generation
  const annualGeneration = capacity * irradiance * 365 * performanceRatio;

  // Step 3: Wind Viability Check
  let windViability = "NotViable";
  if (windSpeed >= 5.5) windViability = "Viable";
  else if (windSpeed >= 4.0) windViability = "Marginal";

  // Step 4: Annual Wind Generation (agar viable ho)
  let annualWindGeneration = 0;
  let adjustedCapacityFactor = 0;

  if (windViability === "Viable") {
    adjustedCapacityFactor = windCapacityFactor; // 0.22 - full value
  } else if (windViability === "Marginal") {
    adjustedCapacityFactor = windCapacityFactor * 0.5; // 0.11 - aadha
  }
  // NotViable ho to 0 hi rahega

  annualWindGeneration = capacity * adjustedCapacityFactor * 8760;

  // Step 5: Recommended Type
  let recommendedType = "solar";
  if (annualWindGeneration > annualGeneration) recommendedType = "wind";

  // Step 6: Annual Savings (simple version abhi ke liye)
  const annualSavings = annualGeneration * tariff;

  // Step 7: Installation Cost
  const totalCost = capacity * costPerKw;

  // Step 8: Payback Period
  const paybackPeriod = totalCost / annualSavings;

  // Step 9: NPV Calculation
  let npv = -totalCost;
  for (let year = 1; year <= systemLifetime; year++) {
    npv += annualSavings / Math.pow(1 + discountRate, year);
  }

  // Sab kuch ek object mein return karo
  return {
    capacity,
    annualGeneration,
    annualWindGeneration,
    windViability,
    recommendedType,
    annualSavings,
    totalCost,
    paybackPeriod,
    npv
  };
}

module.exports = calculateFeasibility;