const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Register API Routes
const performanceRoutes = require('./routes/performance');
app.use('/api/performance', performanceRoutes);

const feasibilityRoute = require('./routes/feasibility');
app.use('/api/feasibility', feasibilityRoute);

const schemeRoutes = require('./routes/schemes');
app.use('/api/schemes', schemeRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', port: PORT });
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server chal raha hai: http://localhost:${PORT}`);
});