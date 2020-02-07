const BoardRepository = require("../repositories/boardRepository");

class BoardService {
    constructor() {
        this.repository = new BoardRepository();
    }

    //async or not
    async findAll() {
        return await this.repository.find({});
    }

    async findSpecifyBoard(condition) {
        const findedBoard = await this.repository.findOne(condition);

        return findedBoard;
    }

    async addBoard(newBoard) {
        try {
            const findedBoard = await this.repository.addBoard(newBoard);
            console.log(findedBoard);
        }
        catch(err) {
            return "Error";
        }
    }

    async deleteBoardByName(name) {
        return await this.repository.removeBoard(name);
    }
}

module.exports = BoardService;
