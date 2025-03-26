const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const server = express();
const port = process.env.PORT || 3000;

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Watchly API Documentation',
            version: '1.0.0',
            description: 'Documentation for the Watchly API endpoints',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/router/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Load model associations
require('./database/src/models/associations');

// ROUTES
const showsRoutes = require('./src/router/shows_router');
const castingRoutes = require('./src/router/casting_router');
const episodeRoutes = require('./src/router/episode_router'); 
const genreRoutes = require('./src/router/genre_router');
const pictureRoutes = require('./src/router/picture_router');
const personRoutes = require('./src/router/person_router');


// CONTROLLERS / SERVICES
const showsServices = require('./src/services/shows_services');
const showsController = require('./src/controllers/shows_controller');
const episodeServices = require('./src/services/episode_services'); 
const castingServices = require('./src/services/casting_services');
const genreController = require('./src/controllers/genre_controller');
const pictureServices = require('./src/services/picture_services');
const personController = require('./src/controllers/person_controller');
const favoriteController = require('./src/controllers/favorite_controller');

// MIDDLEWARES
server.use(express.json());
server.use(cors());

// ROUTING
server.use('/api/shows', showsRoutes);
server.use('/api/casting', castingRoutes);
server.use('/api/episodes', episodeRoutes); 
server.use('/api/pictures', pictureRoutes);
server.use('/api/genres', genreRoutes);
server.use('/api/persons', personRoutes);

// Swagger route
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
            console.log(chalk.green('[DB] Genres added to all shows'));

            console.log(chalk.cyan('[DB] Adding images...'));
            await pictureServices.addImagesToAllShows();
            console.log(chalk.green('[DB] Images added to all shows'));

            console.log(chalk.cyan('[DB] Adding users...'));
            await personController.addUsers();
            console.log(chalk.green('[DB] Users added'));
            
            console.log(chalk.cyan('[DB] Adding favorites...'));
            await favoriteController.addFavorites();
            console.log(chalk.green('[DB] Favorites added'));

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