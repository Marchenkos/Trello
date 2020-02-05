const mongoose = require("mongoose");

function connect() {
    mongoose.connect("mongodb+srv://marchenkus:qazxcdevbnmk12@cluster0-ywtyg.mongodb.net/trello", {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    return "DB is connected";
}

module.exports = connect;
