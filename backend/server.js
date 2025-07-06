const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'logs.json');

app.use(cors());
app.use(express.json());

function readLogs() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE);
  return JSON.parse(raw);
}

function writeLogs(logs) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(logs, null, 2));
}

app.post('/logs', (req, res) => {
  const log = req.body;
  const requiredFields = ["level", "message", "resourceId", "timestamp", "traceId", "spanId", "commit", "metadata"];
  if (!requiredFields.every(field => log.hasOwnProperty(field))) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  const logs = readLogs();
  logs.push(log);
  writeLogs(logs);
  res.status(201).json(log);
});

app.get('/logs', (req, res) => {
  let logs = readLogs();
  const { message, level, resourceId, timestamp_start, timestamp_end } = req.query;

  if (message) logs = logs.filter(l => l.message.toLowerCase().includes(message.toLowerCase()));
  if (level) logs = logs.filter(l => l.level === level);
  if (resourceId) logs = logs.filter(l => l.resourceId === resourceId);
  if (timestamp_start) logs = logs.filter(l => new Date(l.timestamp) >= new Date(timestamp_start));
  if (timestamp_end) logs = logs.filter(l => new Date(l.timestamp) <= new Date(timestamp_end));

  logs = logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  res.json(logs);
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
