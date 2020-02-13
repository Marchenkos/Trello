const mongoose = require("mongoose");
const { CONNECT_URL } = require("./secretFile.env");

class DB {
    connect() {
        mongoose.connect(CONNECT_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
    }
}

module.exports = DB;
