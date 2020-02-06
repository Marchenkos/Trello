const express = require("express");
const bodyParser = require("body-parser");
const Board = require("../../db/models/boards");
const Card = require("../../db/models/card");
const { isCardExist, isBoardExist } = require("../helpers/findBoards");

const jsonParser = bodyParser.json();
const router = express.Router();

router.get("/:name", async (req, res) => {
    const cardName = req.params.name;
    const findedCard = await Card.find({ name: cardName });

    findedCard.length > 0 ? res.send(findedCard) : res.send("This card is not exsist");
});

router.get("/", async (req, res) => {
    const cardList = await Card.find({});

    res.send(cardList);
});


router.post("/", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const { name, description, createAt, estimate, dueDate, labels } = req.body;

    if (! await isBoardExist({ name: createAt })) {
        res.send("This board is not exist");
    }

    const newCard = new Card({
        name,
        createAt,
        description,
        estimate,
        dueDate,
        labels
    });

    await newCard.save();
    res.send("Card is added");
});

router.delete("/removeAll/:name", jsonParser, async (req, res) => {
    const boardName = req.params.name;

    if (! await isCardExist({ createAt: boardName })) {
        res.send("Cards aren't exist");
    }

    await Card.deleteMany({ createAt: boardName });
    res.send("Cards are removed");
});

router.delete("/:name", jsonParser, async (req, res) => {
    const cardName = req.params.name;

    if (! await isCardExist({ name: cardName })) {
        res.send("Card isn't exist");
    }

    await Card.deleteOne({ name: cardName });
    res.send("Card is removed");
});

router.put("/:name", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const cardName = req.params.name;
    const newValues = req.body;

    if (! await isCardExist({ name: cardName })) {
        res.send("Card isn't exist");
    }

    const card = await Card.findOne({ name: cardName });

    await Card.findByIdAndUpdate(card._id, newValues);

    res.send("Card is update");
});

module.exports = router;
