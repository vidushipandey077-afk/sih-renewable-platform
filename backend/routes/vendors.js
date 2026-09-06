const express = require('express');

const router = express.Router();


// ==========================================
// TEST
// GET /api/vendors
// ==========================================

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Vendor API is working'
  });
});


// ==========================================
// SEARCH
// POST /api/vendors/search
// ==========================================

router.post('/search', (req, res) => {

  const {
    location,
    capacity,
    systemType,
    projectType
  } = req.body;

  console.log('Vendor search received:', {
    location,
    capacity,
    systemType,
    projectType
  });


  // Temporary test response
  res.json({

    success: true,

    total: 1,

    vendors: [

      {
        id: 1,

        name: 'BlueSky Solar Solutions',

        location: 'Lucknow, Uttar Pradesh',

        rating: 4.6,

        reviews: 87,

        experience: 6,

        projectsCompleted: 410,

        minCapacity: 1,

        maxCapacity: 250,

        description:
          'Solar EPC and rooftop installation company serving homes, shops and businesses.',

        services: [
          'Rooftop Solar',
          'Net Metering',
          'Installation',
          'AMC'
        ],

        phone: '+91 9876543215',

        email:
          'info@blueskysolar.example',

        verified: true,

        matchScore: 100

      }

    ]

  });

});


module.exports = router;