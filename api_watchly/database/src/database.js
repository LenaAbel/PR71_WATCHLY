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
        console.log(chalk.green('✅ Database connection established successfully.'));

        // DON'T force sync unless you really want to reset the schema
        await sequelize.sync(); 
        console.log(chalk.green('✅ Database synchronized successfully.'));
    } catch (error) {
        console.error(chalk.red('❌ Unable to connect to the database:'), error);
    }
}

initializeDatabase();

module.exports = sequelize;
