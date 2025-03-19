const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();
const port = process.env.PORT || 3000;

const show = require('./src/routes/shows_routes.js');

server.use(express.json());
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());

// Basic route
server.get('/', (req, res) => {
    res.json({ message: 'Welcome to Watchly API' });
});

// Routes
server.use('/api/shows', show);

// Start server
server.listen(port, () => {
    console.log(chalk.cyan.bold(`Server is running on port ${port}`));
});

server.get('/api', (req, res) => {
    res.json({ message: 'Welcome to Watchly API' });
});

// Error handling middleware should be last
server.use((err, req, res, next) => {
    console.error(chalk.red('Unhandled server error:', err.stack || err.message));
    res.status(500).json({ error: 'An unexpected error occurred' });
});

