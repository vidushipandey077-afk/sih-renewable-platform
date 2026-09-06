const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());


// ==========================================
// FEASIBILITY ROUTE
// ==========================================

const feasibilityRoute = require('./routes/feasibility');

app.use(
  '/api/feasibility',
  feasibilityRoute
);


// ==========================================
// VENDORS ROUTE
// ==========================================

const vendorsRoute = require('./routes/vendors');

app.use(
  '/api/vendors',
  vendorsRoute
);


// ==========================================
// HOME TEST ROUTE
// ==========================================

app.get('/', (req, res) => {
  res.send('Backend is running!');
});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(
    `Server chal raha hai: http://localhost:${PORT}`
  );
});