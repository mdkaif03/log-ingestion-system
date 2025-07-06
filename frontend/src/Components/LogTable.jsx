import React from 'react';

const levelColor = {
  error: '#f8d7da',
  warn: '#fff3cd',
  info: '#d1ecf1'
};

function LogTable({ logs }) {
  return (
    <table border="1" width="100%" cellPadding="8">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Level</th>
          <th>Message</th>
          <th>Resource ID</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => (
          <tr key={index} style={{ backgroundColor: levelColor[log.level] || '#fff' }}>
            <td>{new Date(log.timestamp).toLocaleString()}</td>
            <td>{log.level}</td>
            <td>{log.message}</td>
            <td>{log.resourceId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LogTable;
