const mongoose = require("mongoose");

class DB {
    constructor() {
    }

    connect() {
        mongoose.connect("mongodb+srv://marchenkus:qazxcdevbnmk12@cluster0-ywtyg.mongodb.net/trello", {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
    }
}

module.exports = DB;
