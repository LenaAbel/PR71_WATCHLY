const sqlite3 = require("sqlite3").verbose();

function connect(dbPath) {
    return new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error("Error opening database:", err.message);
        } else {
            console.log("Connected to SQLite database.");
        }
    });
}
        
module.exports = { connect };
