"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
});
