const Board = require("../../db/models/boards");
const Card = require("../../db/models/card");

async function isBoardExist(property) {
    const boardList = await Board.find(property);

    return boardList.length > 0 ? true : false;
}

async function isCardExist(property) {
    const cardList = await Card.find(property);

    return cardList.length > 0 ? true : false;
}

module.exports = {
    isBoardExist,
    isCardExist
};
