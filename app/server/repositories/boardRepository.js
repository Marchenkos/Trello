const Board = require("../../db/models/boards");

class BoardRepository {
    async isBoardExist(property) {
        const boardList = await Board.find(property);
    
        return boardList.length > 0 ? true : false;
    }

    async find(condition) {
        const findedBoard = await Board.find(condition);

        return findedBoard.length > 0 ? findedBoard : null;
    }

    async findOne(condition) {
        const board = await Board.findOne(condition);

        return board;
    }

    async addBoard(newBoard) {
        await Board.create(newBoard, (err, rez) => {
            if(err) {
                return err;
            }
        });

        return "Success";
    }

    async removeBoard(condition) {
        return await Board.findOneAndDelete(condition);
    }
}

module.exports = BoardRepository;
