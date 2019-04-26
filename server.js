const express = require('express');

const server = express();

// Import Routers

const actionsRouter = require('./action/actions-router');

// Global Middleware

server.use(express.json());

// Configure Routes

server.get('/', (req, res) => {
    res.send('Hi there!')
})

server.use('/api/actions', actionsRouter);

module.exports = server;