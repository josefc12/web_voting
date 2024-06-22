const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const redis = require('redis');

// Initialize express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Initialize Redis client
const redisClient = redis.createClient();

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

// Serve static files from the 'public' directory
app.use(express.static('server/public'));

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});