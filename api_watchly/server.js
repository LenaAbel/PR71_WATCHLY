const express = require('express');
const chalk = require('chalk');
const app = express();
const port = process.env.PORT || 3000;
const show = require('./database/src/controllers/shows.js');
// Middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Watchly API' });
});

// Start server
app.listen(port, () => {
    console.log(chalk.cyan.bold(`Server is running on port ${port}`));
});

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to Watchly API' });
});