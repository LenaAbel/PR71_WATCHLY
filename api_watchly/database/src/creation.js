const { connect } = require("./connexion.js");
const fs = require("fs");

const dbPath = "../data/watchlyDB";
const dbSchema = "../data/firstsql.sql";


function createDB(dbPath,dbSchema){
    const sqlFile = fs.readFileSync(dbSchema, "utf8");
    const db = connect(dbPath);
    db.exec(sqlFile, (err) => {
        if (err) {
            console.error("Error executing SQL file:", err.message);
        } else {
            console.log("SQL file executed successfully.");
        }
        db.close();
    });
}

createDB(dbPath,dbSchema);
