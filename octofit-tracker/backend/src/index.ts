import express from 'express';
import './config/database';

const app = express();
const port = process.env.PORT || 8000;

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
