const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    color: {
        type: String,
        default: "white"
    },
    description: {
        type: String,
        default: null
    },
    createAt: {
        type: String,
        required: true
    }
});

module.exports = model("Boards", schema);
