const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    description: {
        type: String
    },
    color: {
        type: String
    },
    createAt: {
        type: String
    }
});

module.exports = model("Boards", schema);
