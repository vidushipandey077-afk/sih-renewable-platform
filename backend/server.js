const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const feasibilityRoute = require('./routes/feasibility');
app.use('/api/feasibility', feasibilityRoute);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server chal raha hai: http://localhost:${PORT}`);
});