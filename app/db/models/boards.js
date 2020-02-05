const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "white"
    },
    description: {
        type: String,
        default: null
    },
    cards: {
        type: Array,
        default: []
    }
});

module.exports = model("Boards", schema);
