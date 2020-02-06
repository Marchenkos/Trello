const express = require("express");
const boardRouter = require("./modules/board");
const regRouter = require("./modules/reg");
const authRouter = require("./modules/auth");
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
app.use("/reg", regRouter);
app.use("/auth", authRouter);

app.use((err, req, res, next) => {
    res.status(500).send("Something brroken");
});

start();
