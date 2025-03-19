const chalk = require('chalk');
const { Sequelize } = require('sequelize');
const Shows = require('./models/shows');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/watchlyDB',
    logging: msg => console.log(chalk.blue(msg))
});

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log(chalk.green('Database connection established successfully.'));
        
        await sequelize.sync({ force: true });
        console.log(chalk.green('Database synchronized successfully.'));
        
    } catch (error) {
        console.error(chalk.red('Unable to connect to the database:'), error);
    }
}

initializeDatabase();

module.exports = sequelize;
