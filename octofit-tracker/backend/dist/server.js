"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
const teams = [
    { id: 1, name: 'Momentum', members: 8, focus: 'Endurance' },
    { id: 2, name: 'Velocity', members: 6, focus: 'Strength' },
];
const leaderboard = [
    { id: 1, name: 'Ada Lovelace', score: 1200 },
    { id: 2, name: 'Grace Hopper', score: 1150 },
];
const workouts = [
    { id: 1, name: 'Full Body Strength', durationMinutes: 45, difficulty: 'Intermediate' },
    { id: 2, name: 'Morning Run', durationMinutes: 30, difficulty: 'Beginner' },
];
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl });
});
app.get('/api/users', (_req, res) => {
    res.json({ users, apiBaseUrl });
});
app.get('/api/activities', (_req, res) => {
    res.json({ activities, apiBaseUrl });
});
app.get('/api/teams', (_req, res) => {
    res.json({ teams, apiBaseUrl });
});
app.get('/api/leaderboard', (_req, res) => {
    res.json({ leaderboard, apiBaseUrl });
});
app.get('/api/workouts', (_req, res) => {
    res.json({ workouts, apiBaseUrl });
});
app.listen(port, host, () => {
    console.log(`OctoFit backend listening on http://${host}:${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
});
