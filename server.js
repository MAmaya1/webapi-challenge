const express = require('express');

const server = express();

// Global Middleware

server.use(express.json());

// Configure Routes

server.get('/', (req, res) => {
    res.send('Hi there!')
})

module.exports = server;