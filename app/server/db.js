const mongoose = require("mongoose");
const dbConfig   = require("../config/dbConfig");

class DB {
    connect() {
        mongoose.connect(dbConfig.connectUrl, dbConfig.connectionOptions);
    }
}

module.exports = DB;
