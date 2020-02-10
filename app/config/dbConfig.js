const mongoose = require("mongoose");
const { CONNECT_URL } = require("./secretFileENM");

class DB {
    constructor() {
    }

    connect() {
        mongoose.connect(CONNECT_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
    }
}

module.exports = DB;
