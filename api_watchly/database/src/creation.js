const { connect } = require("./config/database.js");
const fs = require("fs");
const path = require("path");
const chalk = require('chalk');

const dbPath = path.join(__dirname, "../data/watchlyDB");
const dbSchema = path.join(__dirname, "../data/firstsql.sql");

function createDB(dbPath,dbSchema){
    const sqlFile = fs.readFileSync(dbSchema, "utf8");
    const db = connect(dbPath);
    db.exec(sqlFile, (err) => {
        if (err) {
            console.error(chalk.red("Error executing SQL file:"), err.message);
        } else {
            console.log(chalk.green("SQL file executed successfully."));
        }
        db.close();
    });
}

createDB(dbPath,dbSchema);
