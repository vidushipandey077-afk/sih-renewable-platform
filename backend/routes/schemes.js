const express = require('express');
const router = express.Router();
const { matchSchemes } = require('../services/schemeMatcher');

// POST /api/schemes/match
router.post('/match', (req, res) => {
  try {
    const { orgType, sector, state } = req.body || {};
    const matchedSchemes = matchSchemes({ orgType, sector, state });

    return res.status(200).json({
      success: true,
      totalMatched: matchedSchemes.length,
      schemes: matchedSchemes
    });
  } catch (error) {
    console.error('Error executing scheme matcher:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process solar scheme matching.'
    });
  }
});

module.exports = router;