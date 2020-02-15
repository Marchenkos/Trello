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
        const result = await Board.findOne(condition, (err, board) => {
            if (err) {
                return null;
            }

            return board;
        });

        return result;
    }

    async addBoard(newBoard) {
        try {
            const result = await Board.create(newBoard)
     
            return result;
        }
        catch(err) {
            return false;
        }
    }

    async removeBoard(condition) {
        try {
            return await Board.findOneAndDelete(condition);
        }
        catch(err) {
            return false;
        }
    }

    async updateBoard(name, newParameters) {
        try {
            return await Board.findOneAndUpdate(name, {$set: newParameters});
        }
        catch(err) {
            return false;
        }
    }
}

module.exports = BoardRepository;
