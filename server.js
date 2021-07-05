const express = require('express');

const server = express();

// Import Routers

const actionsRouter = require('./action/actions-router');
const projectsRouter = require('./projects/projects-router');

// Global Middleware

server.use(express.json());

// Configure Routes

server.get('/', (req, res) => {
    res.send('Hi there!')
})

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

module.exports = server;