const express = require("express");
const fs = require("fs");
const boardRouter = require("./modules/board");
const connectToDB = require("../db/mongoDB");

const app = express();

async function start() {
    const message = await connectToDB();

    app.listen(3000, () => {
        console.log("Server is loaded");
        console.log(message);
    });
}

app.get("/", (req, res) => {
//????
});

app.use("/board", boardRouter);

start();
