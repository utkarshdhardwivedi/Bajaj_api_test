const express = require('express');
const cors    = require('cors');
const { graphHandler } = require('./endpoint');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/bfhl', graphHandler);         // evaluator endpoint
app.post('/api/graph', graphHandler);    // frontend endpoint

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server live → http://localhost:${PORT}`);
});
