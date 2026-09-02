const calculateFeasibility = require('./services/feasibilityCalculator');
const getClimateData = require('./services/nasaService');

async function runTest() {
  // Delhi ka lat-long: 28.6, 77.2
  const climate = await getClimateData(28.6, 77.2);
  console.log("NASA se mila data:", climate);

  const result = calculateFeasibility(
    500,
    climate.irradiance,
    climate.windSpeed,
    9,
    "09:00",
    "18:00"
  );

  console.log("Feasibility Result:", result);
}

runTest();