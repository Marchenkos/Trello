const mongoose = require("mongoose");
const dbConfig   = require("../config/dbConfig");
console.log(process.env);
class DB {
    connect() {
        mongoose.connect(dbConfig.connectUrl, dbConfig.connectionOptions);
    }
}

module.exports = DB;
