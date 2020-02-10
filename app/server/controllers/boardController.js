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
        if (!req.body) return res.sendStatus(400);

        const { name, color, description, createAt } = req.body;

        const result = await this.service.addBoard({
            name,
            color,
            description,
            createAt
        });

        result ? res.send(result) : next(new Error("Not add"));
    }

    async deleteBoardByName(req, res, next) {
        const boardName = req.params.name;
        //лучше вызывать функци. проверки или ловить ошибку?
        // if (! await isBoardExist({ name: boardName })) {
        //     res.send("This board isn't exist");
        // }
    
        const removeBoard = await this.service.deleteBoardByName({ name: boardName });
        
        removeBoard ? res.send(removeBoard) : next(new Error());
    }

    async updateBoard(req, res, next) {
        const boardName = req.params.name;
        const newValues = req.body;

        const board = await this.service.updateBoard(boardName, newValues);
        
        board ? res.send(board) : next(new Error());
    }
}

module.exports = BoardController;
