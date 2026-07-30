import express from 'express';
import './config/database';

const app = express();
app.use(express.json());

const port = Number(process.env.PORT || 8000);
const host = '0.0.0.0';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const users = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' },
  { id: 2, name: 'Grace Hopper', email: 'grace@example.com' },
];

const activities = [
  { id: 1, type: 'Workout', durationMinutes: 45, userId: 1 },
  { id: 2, type: 'Run', durationMinutes: 30, userId: 2 },
];

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.get(['/api/users', '/api/users/'], (_req, res) => {
  res.json({ users, apiBaseUrl });
});

app.get(['/api/activities', '/api/activities/'], (_req, res) => {
  res.json({ activities, apiBaseUrl });
});

app.listen(port, host, () => {
  console.log(`OctoFit backend listening on http://${host}:${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
