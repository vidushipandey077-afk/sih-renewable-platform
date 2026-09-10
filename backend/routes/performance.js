const express = require('express');
const router = express.Router();

router.post('/check', (req, res) => {
    try {
        const { expectedGeneration, actualGeneration } = req.body;
        const expected = Number(expectedGeneration) || 0;
        const actual = Number(actualGeneration) || 0;
        
        const efficiency = expected > 0 ? ((actual / expected) * 100).toFixed(2) : 0;
        const status = efficiency >= 85 ? 'Optimal' : efficiency >= 60 ? 'Moderate' : 'Underperforming';

        res.status(200).json({
            success: true,
            efficiency: Number(efficiency),
            status
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error calculating performance." });
    }
});

module.exports = router;