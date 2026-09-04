const express = require('express');
const router = express.Router();
const calculateFeasibility = require('../services/feasibilityCalculator');
const getClimateData = require('../services/nasaService');

router.post('/', async (req, res) => {
  try {
    const { location, area, tariff, operatingStart, operatingEnd } = req.body;

    // location se lat aur lon nikal rahe hain
    const { lat, lon } = location;

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
      climate,
      result
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Kuch galat ho gaya" });
  }
});

module.exports = router;