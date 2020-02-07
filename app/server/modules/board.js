const express = require("express");
const bodyParser = require("body-parser");
const Board = require("../../db/models/boards");
const { isBoardExist } = require("../helpers/findBoards");

const jsonParser = bodyParser.json();
const router = express.Router();

router.get("/:name", async (req, res) => {
    const boardName = req.params.name;
    const findedBoard = await Board.find({ name: boardName });

    findedBoard.length > 0 ? res.send(findedBoard) : res.send("This board is not exsist");
});

router.get("/", async (req, res) => {
    const boardList = await Board.find({});

    res.send(boardList);
});

router.post("/", jsonParser, async (req, res, next) => {
    try {
        if (!req.body) return res.sendStatus(400);

        const { name, color, description, createAt } = req.body;
    
        const newBoard = new Board({
            name,
            color,
            description,
            createAt
        });
    
        await newBoard.save();
        await newBoard
        res.send("Board is added");
    }
    catch (err) {
        next(err);
    }
});

router.delete("/:name", jsonParser, async (req, res) => {
    const boardName = req.params.name;

    if (! await isBoardExist({ name: boardName })) {
        res.send("This board isn't exist");
    }

    await Board.deleteOne({ name: boardName });
    res.send("Board is removed");
});

// router.delete("/", jsonParser, async (req, res) => {
//     if (!req.body) return res.sendStatus(400);

//     const { boardList } = req.body;

//     const promiseList = boardList.map(async item => {
//         return new Promise(async (res, rej) => {
//             if (await isBoardExist({ name: item })) {
//                 res();
//             } else {
//                 rej();
//             }
//         });
//     });

//     console.log(promiseList);

//     Promise.all(promiseList).then(() => {
//         boardList.map(async item => {
//             await Board.deleteOne({ name: item });
//         });

//         res.send("Boards are removed");
//     }, () => {
//         res.send("Board isn't exist");
//     });
// });

router.put("/:name", jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const boardName = req.params.name;
    const newValues = req.body;

    const board = await Board.findOne({ name: boardName });

    await Board.findByIdAndUpdate(board._id, newValues);

    res.send("Board is update");
});

module.exports = router;
