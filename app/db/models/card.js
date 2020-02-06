const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    createAt: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
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
        type: Boolean,
        default: false
    }
});

module.exports = model("Cards", schema);
