const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const server = express();
const port = process.env.PORT || 3000;

require('dotenv').config(); 

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
const commentRoutes = require('./src/router/comment_router');
const favoriteRoutes = require('./src/router/favorite_router');
const userRouter = require('./src/router/userRouter');

// CONTROLLERS / SERVICES
const showsServices = require('./src/services/shows_services');
const showsController = require('./src/controllers/shows_controller');
const episodeServices = require('./src/services/episode_services'); 
const castingServices = require('./src/services/casting_services');
const genreController = require('./src/controllers/genre_controller');
const pictureServices = require('./src/services/picture_services');
const personController = require('./src/controllers/person_controller');
const favoriteController = require('./src/controllers/favorite_controller');
const commentServices = require('./src/services/comment_services');


// MODELS
const Show = require('./database/src/models/shows');
const Episode = require('./database/src/models/episode');
const Casting = require('./database/src/models/casting');
const Picture = require('./database/src/models/picture');

// MIDDLEWARES
server.use(express.json({ limit: '50mb' }));  
server.use(express.urlencoded({ limit: '50mb', extended: true }));  
server.use(cors());
server.use('/uploads', express.static('public/uploads')); 

// ROUTING
server.use('/api/shows', showsRoutes);
server.use('/api/casting', castingRoutes);
server.use('/api/episodes', episodeRoutes); 
server.use('/api/pictures', pictureRoutes);
server.use('/api/genres', genreRoutes);
server.use('/api/persons', personRoutes);
server.use('/api/users', userRouter);
server.use('/api/comments', commentRoutes);
server.use('/api/favorites', favoriteRoutes);
// Swagger route
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Basic routes
server.get('/', (req, res) => {
    res.json({ message: 'Welcome to Watchly API' });
});

server.get('/api', (req, res) => {
    res.json({ message: 'Welcome to Watchly API' });
});


async function isDatabasePopulated() {
    const [showCount, episodeCount, castingCount, pictureCount] = await Promise.all([
        Show.count(),
        Episode.count(),
        Casting.count(),
        Picture.count()
    ]);
    return showCount > 0 && episodeCount > 0 && castingCount > 0 && pictureCount > 0;
}


(async () => {
    try {
        const isPopulated = await isDatabasePopulated();
        if (!isPopulated) {
            console.log(chalk.cyan('[DB] Initializing database...'));

            await showsController.addsShowsDB('week');
            const shows = await showsServices.getShows('tv', 'week', process.env.TMDB_PAGES);

            console.log(chalk.cyan('[DB] Adding episodes...'));
            await episodeServices.addEpisodes(shows);

            console.log(chalk.cyan('[DB] Adding casting...'));
            await castingServices.addCastingForAllShows();

            console.log(chalk.cyan('[DB] Adding genres...'));
            await genreController.addGenresToAllShows();

            console.log(chalk.cyan('[DB] Adding images...'));
            await pictureServices.addImagesToAllShows();
            await pictureServices.addEpisodeImages();
            
            console.log(chalk.cyan('[DB] Adding users...'));
            await personController.addUsers();

            console.log(chalk.cyan('[DB] Adding favorites...'));
            await favoriteController.addFavorites();

            console.log(chalk.cyan('[DB] Adding comments...'));
            await commentServices.addCommentsForAllShows();

            console.log(chalk.green('[DB] ✅ Database population complete'));
        } else {
            console.log(chalk.blue('[DB] ✅ Database already populated. Skipping initialization.'));
        }

        server.listen(port, () => {
            console.log(chalk.cyan.bold(`Server is running on port ${port}`));
        });

    } catch (error) {
        console.error(chalk.red('[Error] Database initialization failed:'), error);
    }
})();


//Error handler for .env API_KEYS
if(!process.env.API_KEYS) {
    console.error(
        "\x1b[31m%s\x1b[0m",
        "\n[ENV ERROR] Missing API_KEYS in your .env file. Please add it like so:\nAPI_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWY3NWRmNjMxZTg1MjQxOTdlNmUxYjE4Yzc0MmIyZiIsIm5iZiI6MTc0MDQ3MzUxMy45NzksInN1YiI6IjY3YmQ4NGE5YjQxZTk1ZDMyYzU5OWFlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PS9jWtoxQ7gWwrmRisQG11KA8jPClD8KBxzhFU_7L1w\n Since I am very nice I am giving you my API key since it's free and I am avoiding you to make an account on TMDB just for it lol."
    );
}

// Error handler for .env JWT_SECRET
if(!process.env.JWT_SECRET) {
    console.error(
        "\x1b[31m%s\x1b[0m", 
        "\n[ENV ERROR] Missing JWT_SECRET in your .env file. Please add it like so:\nJWT_SECRET=your_secret_key"
    );
}

// Error handler for .env
if (!process.env.TMDB_PAGES) {
    console.error(
        "\x1b[31m%s\x1b[0m", 
        "\n[ENV ERROR] Missing TMDB_PAGES in your .env file. Please add it like so:\nTMDB_PAGES=1"
    );
}

// Error handler for 404 Not Found
server.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Error handler (must be last)
server.use((err, req, res, next) => {
    console.error(chalk.red('Unhandled server error:', err.stack || err.message));
    res.status(500).json({ error: 'An unexpected error occurred' });
});