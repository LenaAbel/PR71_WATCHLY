const chalk = require('chalk');
const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../data/watchlyDB'),
    logging: false
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
