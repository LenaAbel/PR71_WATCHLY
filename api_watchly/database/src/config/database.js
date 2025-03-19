const sqlite3 = require("sqlite3").verbose();
const chalk = require('chalk');

function connect(dbPath) {
    return new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error(chalk.red("Error opening database:"), err.message);
        } else {
            console.log(chalk.bgGreen("Connected to SQLite database."));
        }
    });
}
        
module.exports = { connect };
