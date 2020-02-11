const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    estimate: {
        type: Number
    },
    dueDate: {
        type: Date
    },
    labels: {
        type: Array
    },
    status: {
        type: Boolean
    },
    createAt: {
        type: String
    }
});

module.exports = model("Cards", schema);
