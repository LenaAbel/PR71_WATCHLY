const express = require('express');
const chalk = require('chalk');
const cors = require('cors');

const server = express();
const port = process.env.PORT || 3000;

const { addsShowsDB } = require('./src/controllers/shows_controller');
const { addEpisodes } = require('./src/controllers/episode_controller');
const showsServices = require('./src/services/shows_services');

// Middlewares
server.use(express.json());
server.use(cors());

// Routes


// Basic route
server.get('/', (req, res) => {
    res.json({ message: 'Welcome to Watchly API' });
});

server.get('/api', (req, res) => {
    res.json({ message: 'Welcome to Watchly API' });
});

// Error handling middleware (should be last)
server.use((err, req, res, next) => {
    console.error(chalk.red('Unhandled server error:', err.stack || err.message));
    res.status(500).json({ error: 'An unexpected error occurred' });
});

// --- ✅ Auto populate DB from TMDB if empty ---
const Show = require('./database/src/models/shows');

(async () => {
    try {
        const count = await Show.count();
        if (count === 0) {
            console.log(chalk.cyan('[DB] Initializing database...'));
            await addsShowsDB('week');
            const newCount = await Show.count();
            console.log(chalk.cyan(`[DB] Added ${newCount} shows`));
            
            console.log(chalk.cyan('[DB] Adding episodes...'));
            const shows = await showsServices.getShows('tv', 'week');
            await addEpisodes(shows);
            console.log(chalk.green('[DB] Database population complete'));
        } else {
            console.log(chalk.blue(`[DB] Database ready: ${count} shows`));
        }
    } catch (error) {
        console.error(chalk.red('[Error] Database initialization failed:', error));
    }

    server.listen(port, () => {
        console.log(chalk.cyan.bold(`Server is running on port ${port}`));
    });
})();

