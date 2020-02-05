const express = require("express");
const bodyParser = require("body-parser");
const Board = require("../../db/models/boards");
const cardRouter = require("./card");

const jsonParser = bodyParser.json();

const router = express.Router();

async function isBoardExist(property) {
    const boardList = await Board.find(property);

    return boardList.length > 0 ? true : false;
}

router.use("/card", cardRouter);

router.get("/", async (req, res) => {
    const boardList = await Board.find({});

    res.header('Access-Control-Allow-Origin', "*");
    res.send(boardList);
});

router.post("/", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const { name, color, description } = req.body;

    if (await isBoardExist({ name })) {
        res.send("The same board already exist");
    }

    const newBoard = new Board({
        name,
        color,
        description
    });

    await newBoard.save();

    res.send("Board is added");
});

router.delete("/", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const { name } = req.body;

    if (! await isBoardExist({ name })) {
        res.send("This board isn't exist");
    }

    await Board.deleteOne({ name });

    res.send("Board is removed");
});

module.exports = router;
