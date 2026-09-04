const express = require('express');
const router = express.Router();
const calculateFeasibility = require('../services/feasibilityCalculator');
const getClimateData = require('../services/nasaService');
const getCoordinates = require('../services/geocodeService');

router.post('/', async (req, res) => {
  try {
    const { address, area, tariff, operatingStart, operatingEnd } = req.body;

    // Address se lat-long nikalo
    const { lat, lon } = await getCoordinates(address);

    // NASA se climate data lao
    const climate = await getClimateData(lat, lon);

    // Feasibility calculate karo
    const result = calculateFeasibility(
      area,
      climate.irradiance,
      climate.windSpeed,
      tariff,
      operatingStart,
      operatingEnd
    );

    // Response bhejo
    res.json({
      success: true,
      coordinates: { lat, lon },
      climate,
      result
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message || "Kuch galat ho gaya" });
  }
});

module.exports = router;