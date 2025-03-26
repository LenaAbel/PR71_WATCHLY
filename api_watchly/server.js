const express = require('express');
const chalk = require('chalk');
const cors = require('cors');

const server = express();
const port = process.env.PORT || 3000;

// ROUTES
const showsRoutes = require('./src/router/shows_router');
const castingRoutes = require('./src/router/casting_router');
const episodeRoutes = require('./src/router/episode_router'); 
const genreRoutes = require('./src/router/genre_router');

// CONTROLLERS / SERVICES
const showsServices = require('./src/services/shows_services');
const showsController = require('./src/controllers/shows_controller');
const episodeServices = require('./src/services/episode_services'); 
const castingServices = require('./src/services/casting_services');
const genreServices = require('./src/services/genre_services');
const genreController = require('./src/controllers/genre_controller');

// MIDDLEWARES
server.use(express.json());
server.use(cors());

// ROUTING
server.use('/api/shows', showsRoutes);
server.use('/api/casting', castingRoutes);
server.use('/api/episodes', episodeRoutes); 
server.use('/api/genres', genreRoutes);

// Basic routes
server.get('/', (req, res) => {
    res.json({ message: 'Welcome to Watchly API' });
});

server.get('/api', (req, res) => {
    res.json({ message: 'Welcome to Watchly API' });
});

// Auto populate DB from TMDB if empty 
const Show = require('./database/src/models/shows');

(async () => {
    try {
        const count = await Show.count();
        if (count === 0) {
            console.log(chalk.cyan('[DB] Initializing database...'));
            await showsController.addsShowsDB('week');
            const newCount = await Show.count();
            console.log(chalk.cyan(`[DB] Added ${newCount} shows`));

            console.log(chalk.cyan('[DB] Adding episodes...'));
            const shows = await showsServices.getShows('tv', 'week');
            await episodeServices.addEpisodes(shows);

            console.log(chalk.cyan('[DB] Adding casting...'));
            await castingServices.addCastingForAllShows();
            console.log(chalk.green('[DB] Casting added to all shows'));

            
            console.log(chalk.cyan('[DB] Adding genres...'));
            await genreController.addGenresToAllShows();
            /*
            console.log(chalk.cyan('[DB] Adding images...'));
            await addImagesToAllShows();

            console.log(chalk.cyan('[DB] Adding users...'));
            await addUsers();

            console.log(chalk.cyan('[DB] Adding favorites...'));
            await addFavorites();
            */

            console.log(chalk.green('[DB] Database population complete'));
        } else {
            console.log(chalk.blue(`[DB] Database ready: ${count} shows`));
        }
    } catch (error) {
        console.error(chalk.red('[Error] Database initialization failed:'), error);
    }

    server.listen(port, () => {
        console.log(chalk.cyan.bold(`Server is running on port ${port}`));
    });
})();

// Error handler (must be last)
server.use((err, req, res, next) => {
    console.error(chalk.red('Unhandled server error:', err.stack || err.message));
    res.status(500).json({ error: 'An unexpected error occurred' });
});
