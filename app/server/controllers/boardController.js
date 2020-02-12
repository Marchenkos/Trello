const BoardService = require("../services/boardService");

class BoardController{
    constructor() {
        this.service = new BoardService();
    }

    async getAll(req, res) {
        const allBoards = await this.service.findAll();

        allBoards.length == 0 ? res.send(null) : res.send(allBoards);
    }

    async getSpecifyBoard(req, res, next) {
        const boardName = req.params.name;

        const board = await this.service.findSpecifyBoard({ name: boardName });

        board === null ? next(new Error("Not found")) : res.send(board);
    }

    async addBoard(req, res, next) {
        if (res.statusCode == "422") return next(new Error("No correct data"));

        const { name, color, description, createAt } = req.body;

        const result = await this.service.addBoard({
            name,
            color,
            description,
            createAt
        });

        result ? res.send(result) : next(new Error("Board is not added"));
    }

    async deleteBoardByName(req, res, next) {
        if (res.statusCode == "422") return next(new Error("No correct data"));

        const boardName = req.params.name;

        const removeBoard = await this.service.deleteBoardByName({ name: boardName });
        
        removeBoard ? res.send(removeBoard) : next(new Error("Board is not removed"));
    }

    async updateBoard(req, res, next) {
        if (res.statusCode == "422") return next(new Error("No correct data"));

        const boardName = req.params.name;
        const newValues = req.body;

        const board = await this.service.updateBoard(boardName, newValues);

        board ? res.send(board) : next(new Error("Board is not updated"));
    }
}

module.exports = BoardController;
