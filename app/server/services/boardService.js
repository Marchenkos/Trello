const BoardRepository = require("../repositories/boardRepository");

class BoardService {
    constructor() {
        this.repository = new BoardRepository();
    }

    async findAll() {
        return await this.repository.find({});
    }

    async findSpecifyBoard(condition) {
        const findedBoard = await this.repository.findOne(condition);

        return findedBoard;
    }

    async addBoard(newBoard) {
        return await this.repository.addBoard(newBoard);
    }

    async deleteBoardByName(name) {
        return await this.repository.removeBoard(name);
    }

    async updateBoard(name, values) {
        return await this.repository.updateBoard({ name }, values);
    }
}

module.exports = BoardService;
