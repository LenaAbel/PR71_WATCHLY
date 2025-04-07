# WATCHLY 🎞️⭐

A TV & Movie tracker built with Angular & TypeScript that lets users manage watchlists, track progress, discover new content, and rate shows/movies.

## FIGMA design

https://www.figma.com/design/BFw10l912WWP8uPyzLCNX7/Watchly-maquette-lololol?node-id=0-1&t=wlwYexfgLVnHw9ap-1

## Features

- Create and manage watchlists
- Track watching progress
- Discover new TV shows and movies
- Rate and review content
- User authentication

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (v13.3 or higher)

## Project Structure

The project consists of two main parts:
- `watchly/` - Angular frontend application
- `api_watchly/` - Backend API server

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/PR71_WATCHLY.git
cd PR71_WATCHLY
```

2. Install backend dependencies:
```bash
cd api_watchly
npm install
```

3. Install frontend dependencies:
```bash
cd watchly
npm install
```

## Database Configuration

This project uses Sequelize ORM with SQLite for database operations:

- No separate SQLite installation is required - it's bundled with the npm dependencies
- The `sqlite3` Node.js package is automatically installed during `npm install`
- SQLite is a file-based database that requires zero configuration
- The database schema is defined in `api_watchly/database/data/firstsql.sql`
- The database file is created at `api_watchly/database/data/watchlyDB`
- Initial data is populated from the TMDB API when the server first runs
- Database tables include: shows, episodes, casting, genre, person, comments, favorites, etc.

## Running the Application

1. Start the API server:
```bash
cd api_watchly
npm install
npm start
```
The API will be available at `http://localhost:3000/api/`
The API documentation will be available at `http://localhost:3000/api-docs`

2. In a new terminal, start the Angular development server:
```bash
cd watchly
npm install
ng serve
```
The frontend will be available at `http://localhost:4200`

## Development

- Frontend: Changes to Angular code will automatically reload in the browser

## API Documentation

The API includes Swagger documentation for easy exploration of endpoints:

- Once the API server is running, visit `http://localhost:3000/api-docs` to access the interactive Swagger UI
- The documentation provides details on all available endpoints, request parameters, and response formats

## Environment Configuration

The backend requires a `.env` file in the `api_watchly` directory with the following variables:

```properties
# TMDB API access token (required)
API_KEYS=your_tmdb_api_token

# Secret key for JWT authentication (required)
JWT_SECRET=your_secret_key

# Number of pages to fetch from TMDB API (default: 1)
TMDB_PAGES=1
```

### Setting up the Environment:

1. Create a `.env` file in the `api_watchly` directory
2. Copy the above properties into the file
3. Replace the placeholder values with your actual credentials
4. Make sure to run `npm install` in both the `api_watchly` and `watchly` directories to install all dependencies

### Notes:
- The API will not function correctly without the proper environment variables
- Higher values for TMDB_PAGES will load more content but increase initialization time
- Do not commit your .env file to version control
