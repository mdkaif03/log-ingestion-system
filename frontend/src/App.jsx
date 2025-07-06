import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogTable from './Components/LogTable';

function App() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    message: '',
    level: '',
    resourceId: '',
    timestamp_start: '',
    timestamp_end: ''
  });

  useEffect(() => {
    const fetchLogs = async () => {
      const params = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v));
      const response = await axios.get('http://localhost:5000/logs', { params });
      setLogs(response.data);
    };
    fetchLogs();
  }, [filters]);

  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Log Viewer</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input name="message" placeholder="Search Message" onChange={handleChange} />
        <select name="level" onChange={handleChange}>
          <option value="">All Levels</option>
          <option value="error">Error</option>
          <option value="info">Info</option>
          <option value="warn">Warning</option>
        </select>
        <input name="resourceId" placeholder="Resource ID" onChange={handleChange} />
        <input name="timestamp_start" type="datetime-local" onChange={handleChange} />
        <input name="timestamp_end" type="datetime-local" onChange={handleChange} />
      </div>
      <LogTable logs={logs} />
    </div>
  );
}

export default App;
