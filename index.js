const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  // ✅ No chat history sent to new connections

  ws.on('message', (message) => {
    const parsed = JSON.parse(message);
    if (parsed.type === 'chat') {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'chat', data: parsed.data }));
        }
      });
    }
  });
});

server.listen(3001, () => {
  console.log('✅ WebSocket Server is running at http://localhost:3001');
});
