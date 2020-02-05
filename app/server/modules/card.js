const express = require("express");
const bodyParser = require("body-parser");
const Board = require("../../db/models/boards");

const jsonParser = bodyParser.json();

const router = express.Router();

router.post("/", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const { name, description, boardName, estimate, dueDate, labels } = req.body;

    const newCard = {
        name,
        boardName,
        description,
        estimate,
        dueDate,
        labels
    };

    await Board.update({ name: boardName }, {
        $addToSet: { cards: [newCard] }
    });

    res.send("Card is added");
});

module.exports = router;
