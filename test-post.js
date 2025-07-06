const axios = require('axios');

const log = {
  level: "error",
  message: "Database connection failed",
  resourceId: "server-1234",
  timestamp: new Date().toISOString(),
  traceId: "trace-001",
  spanId: "span-001",
  commit: "a1b2c3d",
  metadata: { parentResourceId: "server-5678" }
};

axios.post('http://localhost:5000/logs', log)
  .then(res => console.log("Log ingested:", res.data))
  .catch(err => console.error("Error:", err.response?.data || err.message));
